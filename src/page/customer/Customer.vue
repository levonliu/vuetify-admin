<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card-title>
                <v-speed-dial right="right" direction="right" transition="slide-x-transition" v-model="fab">
                    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
                        <v-icon>edit</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-tooltip top v-if="checkAuth(['customer/create'])">
                        <v-btn fab dark small color="green" slot="activator" @click="add()">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <span>新增</span>
                    </v-tooltip>
                    <v-tooltip top v-if="checkAuth(['customer/upload'])">
                        <v-btn fab dark small color="blue-grey" slot="activator">
                            <v-icon>cloud_upload</v-icon>
                        </v-btn>
                        <span>上传</span>
                    </v-tooltip>
                    <v-tooltip top v-if="checkAuth(['customer/download'])">
                        <v-btn fab dark small color="yellow darken-3" slot="activator">
                            <v-icon>cloud_download</v-icon>
                        </v-btn>
                        <span>下载</span>
                    </v-tooltip>
                </v-speed-dial>
                <v-spacer></v-spacer>
                <v-flex xs4>
                    <v-text-field
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            v-model.lazy="queryKeyWord"
                    ></v-text-field>
                </v-flex>
            </v-card-title>
        </v-flex>
        <v-flex xs12>
            <dataTable :queryKeyWord="queryKeyWord" :datagrid="datagrid" :isOperate="checkAuth(['customer/update']) || checkAuth(['customer/delete'])">
                <template slot="operateColumn" slot-scope="row">
                        <v-btn icon class="mx-6" @click="edit(row.data)" v-if="checkAuth(['customer/update'])">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-6" @click="isDel(row.data.id)" v-if="checkAuth(['customer/delete'])">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                </template>
            </dataTable>
        </v-flex>
        <v-flex xs12>
            <customerDialog :dialogStatus.sync="dialog" :customerData="customerData"></customerDialog>
        </v-flex>
        <v-flex xs12>
            <mesDialog :mesDialog="mesDialog" :id="delId" mesHeadText="提示" mesContent="确定要删除该数据？">
                <template slot-scope="delData">
                    <v-btn color="blue-grey darken-1" flat @click.native="mesDialog = false">取消</v-btn>
                    <v-btn color="info darken-1" flat @click.native="del(delData.id)">确定</v-btn>
                </template>
            </mesDialog>
        </v-flex>
    </v-layout>
</template>

<script>
    import dataTable from "../../components/DataTable"
    import customerDialog from "./CustomerDialog"
    import mesDialog from "../../components/MessageDialog"

    import { customerDel } from '@/api/customer'

    export default {
        name: "Customer",
        inject: ['reload'],
        data: () => ({
            fab         : false,
            datagrid    : {
                url    : '/customer',
                headers: [
                    {text: '姓名', value: 'name', field: 'name'},
                    {text: '性别', value: 'sex_name', field: 'sex'},
                    {text: '电话', value: 'tel', field: 'tel'},
                    {text: '住址', value: 'address', field: 'address'},
                    {text: '等级', value: 'level_name', field: 'level'},
                ],
            },
            queryKeyWord: '',
            dialog      : false,
            customerData: {},
            mesDialog   : false,
            delId       : 0,
        }),
        methods   : {
            add() {
                this.dialog       = true;
                this.customerData = {};
            },
            edit(data) {
                this.dialog       = true;
                this.customerData = data;
            },
            isDel(id) {
                this.mesDialog = true;
                this.delId     = id;
            },
            del(id) {
                customerDel(id).then( response => {
                    this.mesDialog = false
                    if(response.data.success){
                        this.$store.dispatch('showMessage', {status: true, type: 'success', msg: "删除成功"})
                    }
                }).catch( error => {
                    reject(error)
                })
                this.reload()
            },
            checkAuth(rule){
                return this.$checkAuth(rule)
            }
        },
        computed  : {

        },
        components: {
            dataTable,
            customerDialog,
            mesDialog,
        }
    }
</script>

<style scoped>
    #create .speed-dial {
        position: absolute;
    }

    #create .btn--floating {
        position: relative;
    }
</style>