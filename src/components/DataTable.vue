<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                    :headers="headers"
                    :items="tableData"
                    hide-actions
                    :loading="loading"
                    class="elevation-1"
            >
                <template slot="headers" slot-scope="props">
                    <tr>
                        <th v-for="header in props.headers"
                                :key="header.text"
                                :class="['column sortable',
                                pagination.descending ? 'desc' : 'asc',
                                header.field === pagination.sortBy ? 'active' : '',
                                header.align ? 'text-xs-'+header.align : 'text-xs-left'
                                ]"
                                @click="changeSort(header)"
                                :width="header.width"
                        >
                            {{ header.text }}
                            <v-icon small v-if="header.sortable !== false">arrow_upward</v-icon>
                        </th>
                    </tr>
                </template>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td v-for="(field) in headers" :key="field.text" >
                            <div v-if="field.text === '操作' && isOperate" class="justify-center layout px-0">
                                <slot name="operateColumn" :data="props.item"></slot>
                            </div>
                            <div v-else v-html="renderField(props.item, field)"></div>
                        </td>
                    </tr>
                </template>
                <template slot="no-data">
                    <tr>
                        <td :colspan="tdNum">
                            <v-alert :value="true" color="error" icon="warning">
                                Sorry, 没有数据 :(
                            </v-alert>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 class="text-xs-left text-sm-left text-md-left">
                <v-pagination class="text-xs-center pt-2" v-model="pagination.page" :length="pages" :total-visible="7"
                        circle></v-pagination>
            </v-flex>
            <v-flex xs12 sm6 md6 class="text-xs-right text-sm-right text-md-right">
                <v-layout row wrap>
                    <v-flex xs4 sm4 md6 class="text-xs-right text-sm-right text-md-right">
                        <v-select
                                :items="pageSizes"
                                v-model="pageSize"
                                single-line
                                :menu-props="{ auto: true, overflowY: true }"
                                label="Select"
                                class="pull-right"
                        >
                        </v-select>
                    </v-flex>
                    <v-flex xs8 sm8 md6 class="text-xs-right text-sm-right text-md-right">
                        <v-subheader class="pull-right" style="height: 74px;">条/页,
                            从{{pageFrom}}到{{pageTo}}条，共{{this.totalItems}}条
                        </v-subheader>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import request from '@/utils/request';

    export default {
        name    : "DataTable",
        props   : {
            queryKeyWord: {type: String},
            isOperate   : {type: Boolean},
            datagrid    : {type: Object},
        },
        data    : () => ({
            loading   : true,
            tableData : [],
            pagination: {
                descending : true,
                page       : 1,
                rowsPerPage: 10,
                sortBy     : '',
            },
            headers   : [{text: 'ID', sortable: false, value: 'order', field: 'id',}],
            totalItems: 0,
            pageSizes : [1, 10, 15, 20],
            pageSize  : 10,
        }),
        mounted() {
            this.$nextTick(() => {
                this.init()
            })
        },
        methods : {
            init() {
                this.getList();
                this.initHeader();
            },
            initHeader(){
                this.headers = [{text: 'ID', sortable: false, value: 'order', field: 'id',}]
                this.headers = this.headers.concat(this.datagrid.headers)
                if(this.isOperate){
                    this.headers = this.headers.concat([{text: '操作', sortable: false, width: '10', align: 'center'}]);
                }
            },
            getList() {
                this.loading = true
                if(this.datagrid.url && typeof this.datagrid.url === 'string') {
                    let params = {};
                    //关键字查询keywords
                    if(this.queryKeyWord !== null) {
                        params.queryKeyWord = this.queryKeyWord
                        let fields          = [];
                        this.datagrid.headers.forEach((item) => {
                            fields.push(item.field);
                        });
                        params.queryKeyFields = fields;
                    }
                    // 设置翻页相关参数
                    params.page      = this.pagination.page;
                    params.limit     = this.pageSize;
                    //排序
                    let sortKey      = this.pagination.sortBy ? this.pagination.sortBy : this.headers[0].field;
                    let sort         = this.pagination.descending ? 'desc' : 'asc'
                    params.querySort = [sortKey, sort]

                    let requestData = {
                        url   : this.datagrid.url,
                        method: 'get',
                        params: params,
                    };
                    request(requestData).then(response => {
                        const data  = response.data.data
                        const count = (this.pagination.page - 1) * this.pageSize;
                        data.rows.forEach(function(item, index) {
                            item.order = index + 1 + count
                        })
                        this.tableData  = data.rows
                        this.totalItems = data.total
                        this.loading    = false
                    })
                }
            },
            renderField(item, field) {
                let value = item[field.value];
                return value;
            },
            changeSort(column) {
                if(column.sortable === false) {
                    return ;
                }
                if(this.pagination.sortBy === column.field) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy     = column.field;
                    this.pagination.descending = false
                }
            },
        },
        computed: {
            pages() {
                if(this.pagination.rowsPerPage == null || this.totalItems == null) {
                    return 0;
                }
                return Math.ceil(this.totalItems / this.pagination.rowsPerPage)
            },
            pageFrom() {
                let pageFrom = (this.pagination.page - 1) * this.pagination.rowsPerPage + 1;
                return pageFrom;
            },
            pageTo() {
                let pageTo = this.pagination.page * this.pagination.rowsPerPage;
                return pageTo;
            },
            tdNum() {
                let num = this.headers.length;
                return num;
            }
        },
        watch   : {
            pagination: {
                handler: function() {
                    this.getList();
                },
                deep   : true
            },
            pageSize(val) {
                this.pagination.rowsPerPage = val;
                this.pagination.page        = 1;
                this.getList();
            },
            queryKeyWord() {
                this.getList();
            },
            isOperate(){
                this.initHeader()
            }

        },

    }
</script>

<style scoped>

</style>