<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <!--客户信息-->
            <v-flex xs12 sm12 md4 v-for="i in 3">
                <v-card>
                    <v-img class="white--text" height="100px" src="/static/images/login.jpg">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">Customers</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                        <div>
                            <span class="grey--text">Number 10</span><br>
                            <span>Whitehaven Beach</span><br>
                            <span>Whitsunday Island, Whitsunday Islands</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <!--商品信息-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md6>
                <v-card>
                    <Echarts :data="this.data"></Echarts>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-card>
                    <Echarts :data="this.data"></Echarts>
                </v-card>
            </v-flex>
        </v-layout>
        <!--折线图-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <Echarts :data="this.option1"></Echarts>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Echarts from "../../components/Echarts";
    export default {
        name:"Index",
        data:() => ({
            data : {
                title : {
                    text: '收入分布图',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['卡车销售','车辆维修','配件销售','综合业务','其他收入']
                },
                series : [
                    {
                        name: '收入来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'卡车销售'},
                            {value:310, name:'车辆维修'},
                            {value:234, name:'配件销售'},
                            {value:135, name:'综合业务'},
                            {value:1548, name:'其他收入'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option1 : {
                backgroundColor: '#fff',
                title: {
                    text: '收入趋势图',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#555'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            },
        }),
        mounted(){
        },
        methods:{},
        computed:{},
        components:{
            Echarts,
        }
    }
</script>

<style scoped>

</style>