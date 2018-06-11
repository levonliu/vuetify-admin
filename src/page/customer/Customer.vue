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
            <dataTable :search="search" :dataList="dataList" :isOperate="true" editPathName="customer_edit">
            </dataTable>
        </v-flex>
    </v-layout>
</template>

<script>
    import dataTable from "../../components/DataTable"

    export default {
        name: "Customer",
        props:{

        },
        data:()=>({
            fab: false,
            search:'',
            dataList:{
                headers: [
                    { text: '序号',value: 'index'},
                    { text: '姓名', value: 'name' },
                    { text: '性别', value: 'sex' },
                    { text: '电话', value: 'tel' },
                    { text: '住址', value: 'address' },
                    { text: '组', value: 'group' },
                ],
                data: [
                    {
                        id  : 1,
                        name: 'lll',
                        sex: '女',
                        tel : 157,
                        address : 'a',
                        group : 'A',
                    },
                    {
                        id: 2,
                        name: 'www',
                        sex: '男',
                        tel: 158,
                        address : 'a',
                        group : 'A',
                    },
                    {
                        id: 3,
                        name: 'ddd',
                        sex: '女',
                        tel: 159,
                        address : 'a',
                        group : 'A',
                    },
                    {
                        id: 4,
                        name: 'qqqq',
                        sex: '男',
                        tel: 160,
                        address : 'a',
                        group : 'A',
                    }
                ]
            }
        }),
        mounted(){
            this.$nextTick(function () {
                this.$http.get('/customer').then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            })
        },
        components:{
            dataTable,
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