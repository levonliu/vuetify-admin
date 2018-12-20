<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card-title>
                <v-speed-dial right="right" direction="right" transition="slide-x-transition" v-model="fab">
                    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
                        <v-icon>edit</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-tooltip top v-if="addAuth">
                        <v-btn fab dark small color="green" slot="activator" @click="add()">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <span>新增</span>
                    </v-tooltip>
                    <v-tooltip top v-if="uploadAuth">
                        <v-btn fab dark small color="blue-grey" slot="activator">
                            <v-icon>cloud_upload</v-icon>
                        </v-btn>
                        <span>上传</span>
                    </v-tooltip>
                    <v-tooltip top v-if="downloadAuth">
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
            <dataTable :queryKeyWord="queryKeyWord" :datagrid="datagrid" :isOperate="isOperate">
                <template slot="dataHeader" v-if="editAuth || delAuth" slot-scope="title">

                    <th style="border-bottom: 1px solid rgb(198,198,198)">{{title.data}}</th>
                </template>
                <template slot="otherColumn" slot-scope="slotProps">
                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-6" @click="edit(slotProps.data)" v-if="editAuth">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-6" @click="isDel(slotProps.data.id)" v-if="delAuth">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </dataTable>
        </v-flex>
        <v-flex xs12>
            <customerDialog :dialogStatus.sync="dialog" :customerData="customerData"></customerDialog>
        </v-flex>
        <v-flex xs12>
            <mesDialog :mesDialog="mesDialog" :id="delId" mesHeadText="提示" mesContent="确定要删除该数据？">
                <template slot-scope="slotProps">
                    <v-btn color="blue-grey darken-1" flat @click.native="mesDialog = false">取消</v-btn>
                    <v-btn color="info darken-1" flat @click.native="del(slotProps.id)">确定</v-btn>
                </template>
            </mesDialog>
        </v-flex>
    </v-layout>
</template>

<script>
    import dataTable from "../../components/DataTable"
    import customerDialog from "./CustomerDialog"
    import mesDialog from "../../components/MessageDialog"

    export default {
        name: "Customer",
        data: () => ({
            fab         : false,
            datagrid    : {
                url    : '/customer',
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: '姓名', value: 'name'},
                    {text: '性别', value: 'sex'},
                    {text: '电话', value: 'tel'},
                    {text: '住址', value: 'address'},
                    {text: '组', value: 'level'},
                ],
            },
            queryKeyWord: '',
            dialog      : false,
            customerData: {},
            mesDialog   : false,
            delId       : 0,
            isOperate   : true
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
            del() {
                this.mesDialog = false;
                this.$store.dispatch('showMessage',{status:true,type:'success',msg:"删除成功"})
            }
        },
        computed  : {
            addAuth() {
                return this.$checkAuth(['customer/create']);
            },
            uploadAuth() {
                return this.$checkAuth(['customer/upload']);
            },
            downloadAuth() {
                return this.$checkAuth(['customer/download']);
            },
            editAuth() {
                return this.$checkAuth(['customer/update']);
            },
            delAuth() {
                return this.$checkAuth(['customer/delete']);
            }
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