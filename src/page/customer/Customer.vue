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
            <dataTable :search="search" :dataList="dataList" :isOperate="true" editPathName="customer_eidt">
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
                    { text: '电话', value: 'tel' },
                ],
                data: [
                    {
                        id  : 1,
                        name: 'lll',
                        tel : 157,
                    },
                    {
                        id: 2,
                        name: 'www',
                        tel: 158,
                    },
                    {
                        id: 3,
                        name: 'ddd',
                        tel: 159,
                    },
                    {
                        id: 4,
                        name: 'qqqq',
                        tel: 160,
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