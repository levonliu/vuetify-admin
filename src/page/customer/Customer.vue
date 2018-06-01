<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card-title>
                <v-flex xs8>
                    <v-btn fab dark color="indigo">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-flex>
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
        components:{
            dataTable,
        }
    }
</script>

<style scoped>

</style>