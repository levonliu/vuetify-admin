<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                    :headers="datagrid.headers"
                    :items="tableData"
                    hide-actions
                    :loading="loading"
                    class="elevation-1"
            >
                <template slot="headers" slot-scope="props">
                    <tr>
                        <th v-for="header in props.headers"
                                :key="header.text"
                                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                @click="changeSort(header.value)"
                                class="text-xs-left">
                            {{ header.text }}
                            <v-icon small>arrow_upward</v-icon>
                        </th>
                        <slot name="dataHeader" data="操作"></slot>
                    </tr>
                </template>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td v-for="(field) in datagrid.headers" :key="field.text"
                                v-html="renderField(props.item, field)"></td>
                        <slot name="otherColumn" :data="props.item"></slot>
                    </tr>
                </template>
                <template slot="no-data">
                    <tr>
                        <td :colspan="tdNum">
                            <v-alert :value="true" color="error" icon="warning">
                                Sorry, nothing to display here :(
                            </v-alert>
                        </td>
                    </tr>

                </template>
            </v-data-table>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 class="text-xs-left text-sm-left text-md-left">
                <v-pagination class="text-xs-center pt-2" v-model="pagination.page" :length="pages" :total-visible="7" circle></v-pagination>
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
                            从{{pageFrom}}到{{pageTo}}条，共{{this.pagination.totalItems}}条
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
                sortBy     : 'id',
                totalItems : 0,
            },
            pageSizes : [1, 10, 15, 20],
            pageSize  : 10,
        }),
        mounted() {
            this.$nextTick(() => {
                this.init();
            })
        },
        methods : {
            init() {
                this.getList();
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
                            fields.push(item.value);
                        });
                        params.queryKeyFields = fields;
                    }
                    // 设置翻页相关参数
                    params.page  = this.pagination.page;
                    params.limit = this.pageSize;
                    //排序
                    let sortKey      = this.pagination.sortBy === 'index' ? 'id' : this.pagination.sortBy
                    let sort         = this.pagination.descending ? 'desc' : 'asc'
                    params.querySort = [sortKey, sort]

                    let requestData = {
                        url   : this.datagrid.url,
                        method: 'get',
                        params: params,
                    };
                    request(requestData).then(response => {
                        const data   = response.data.data
                        const count  = (this.pagination.page - 1) * this.pageSize;
                        data.rows.forEach(function(item, index) {
                            item.id = index + 1 + count
                        })
                        this.tableData             = data.rows
                        this.pagination.totalItems = data.total
                        this.loading                = false
                    })
                }
            },
            renderField(item, field) {
                let value = item[field.value];
                return value;
            },
            changeSort(column) {
                if(this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy     = column;
                    this.pagination.descending = false
                }
            },
        },
        computed: {
            pages() {
                if(this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
                    return 0;
                }
                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
                let num = this.datagrid.headers.length;
                num     = this.isOperate ? num += 1 : num;
                return num;
            }
        },
        watch   : {
            pagination: {
                handler: function(val, oldVal) {
                    this.init();
                },
                deep   : true
            },
            pageSize(val) {
                this.pagination.rowsPerPage = val;
                this.pagination.page        = 1;
                this.init();
            },
            queryKeyWord(val){
                this.init();
            }

        },

    }
</script>

<style scoped>

</style>