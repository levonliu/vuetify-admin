<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                    :headers="dataList.headers"
                    :items="dataList.data"
                    :search="search"
                    :pagination.sync="pagination"
                    hide-actions
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
                        <slot name="dataHeader"></slot>
                    </tr>
                </template>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td v-for="(field) in dataList.headers" :key="field.text" v-html="renderField(props.item, field)"></td>
                        <slot name="dataList" :data="props.item"></slot>
                    </tr>
                </template>
                <template slot="no-results">
                    <tr>
                        <td :colspan="tdNum">
                            <v-alert :value="true" color="error" icon="warning">
                                没有数据:(
                            </v-alert>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
        <v-layout>
            <v-flex xs8 class="text-xs-left">
                <v-pagination class="text-xs-center pt-2" v-model="pagination.page" :length="pages" :total-visible="7" circle></v-pagination>
            </v-flex>
            <v-flex xs4 class="text-xs-right">
                <v-layout row>
                    <v-select
                            :items="pageSizes"
                            v-model="pageSize"
                            single-line
                            bottom
                            label="Select"
                            class="pull-right"
                    ></v-select>
                    <v-subheader class="pull-right" style="height: 74px;">条/页, 从{{pageFrom}}到{{pageTo}}条，共{{this.pagination.totalItems}}条</v-subheader>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        name    :"DataTable",
        props   :{
            search   :{type:String},
            dataList :{type:Object},
            isOperate:{type:Boolean},
        },
        data    :() => ({
            pagination:{
                sortBy     :'id',
                rowsPerPage:10,
            },
            pageSizes :[5, 10, 15, 20],
            pageSize  :10,
        }),
        methods :{
            renderField(item, field){
                let value = item[field.value];
                return value;
            },
            changeSort(column){
                if(this.pagination.sortBy === column){
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy     = column;
                    this.pagination.descending = false
                }
            },
        },
        computed:{
            pages(){
                if(this.pagination.rowsPerPage == null || this.pagination.totalItems == null){
                    return 0;
                }
                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            },
            pageFrom(){
                let pageFrom = (this.pagination.page - 1) * this.pagination.rowsPerPage + 1;
                return pageFrom;
            },
            pageTo(){
                let pageTo = this.pagination.page * this.pagination.rowsPerPage;
                return pageTo;
            },
            tdNum(){
                let num = this.dataList.headers.length;
                num     = this.isOperate ? num += 1 : num;
                return num;
            }
        },
        watch   :{
            pageSize(val){
                this.pagination.rowsPerPage = val;
                this.pagination.page        = 1;
            },

        },
    }
</script>

<style scoped>

</style>