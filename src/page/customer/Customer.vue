<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card-title>
                <v-speed-dial right="right" direction="right"  transition="slide-x-transition" v-model="fab">
                    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab >
                        <v-icon>edit</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-tooltip top>
                        <v-btn fab dark small color="green" slot="activator">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <span>新增</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <v-btn fab dark small color="blue-grey" slot="activator">
                            <v-icon>cloud_upload</v-icon>
                        </v-btn>
                        <span>上传</span>
                    </v-tooltip>
                    <v-tooltip top>
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
                            v-model="search"
                    ></v-text-field>
                </v-flex>
            </v-card-title>
        </v-flex>
        <v-flex xs12>
            <dataTable :search="search" :dataList="dataList">
                <template slot="dataHeader">
                    <th style="border-bottom: 1px solid rgb(198,198,198)">操作</th>
                </template>
                <template slot="dataList"  slot-scope="slotProps">
                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-6" @click="edit(slotProps.data)">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-6" @click="del(slotProps.data.id)">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </dataTable>
        </v-flex>
        <v-flex xs12>
            <customerDialog :dialogStatus.sync="dialog" :customerData="customerData"></customerDialog>
        </v-flex>
    </v-layout>
</template>

<script>
    import dataTable from "../../components/DataTable"
    import customerDialog from "../../components/customerDialog"
    import {mapGetters} from 'vuex'

    export default {
        name: "Customer",
        data:()=>({
            fab: false,
            search:'',
            dataList:{
                headers: [
                    { text: '序号',value: 'index'},
                    { text: '姓名', value: 'customer_name' },
                    { text: '性别', value: 'sex_name' },
                    { text: '电话', value: 'tel' },
                    { text: '住址', value: 'address_name' },
                    { text: '组', value: 'group_name' },
                ],
                data: [],
            },
            dialog:false,
            customerData:{},
        }),
        mounted(){
            this.$nextTick(function () {
                let _this = this;
                _this.$http.get('/customer').then(function (response) {
                    response.data.data.forEach( function ( value, index ) {
                        value[ 'index' ] = index + 1;
                    } );
                    _this.dataList.data = response.data.data;
                })
            })
        },
        methods : {
            edit( data ) {
                this.customerData = data;
                this.dialog = true;
            },
            del(id){
                this.snackBar = {
                    status:true,
                    color :'success',
                    msg   :'删除成功',
                }
            }
        },
        computed:{
            ...mapGetters({
                snackBarData:'snackbar',
            }),
            snackBar:{
                get(){
                    return this.snackBarData;
                },
                set(value){
                    this.$store.commit('changeSnackBar', value)
                }
            }
        },
        components:{
            dataTable,
            customerDialog,
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