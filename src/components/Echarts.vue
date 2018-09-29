<template>
    <div class="echarts">
        <div ref="myChart" class="myChart"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name:"Echarts",
        props:{
            data:{type:Object}
        },
        computed: {
            option() {
                return this.data;
            }
        },
        mounted(){
            this.$nextTick(() => {
                const _this = this;
                const myChart = echarts.init(_this.$refs.myChart);
                myChart.setOption(_this.option);
                _this.$refs.myChart.addEventListener("resize",function(){
                    const myChart = echarts.init(_this.$refs.myChart);
                    myChart.setOption(_this.option);
                })
            });
        },
    }
</script>

<style scoped>
    .echarts{
        width: 100%;
        height: 300px;
        background: #fff;
    }
    .myChart{
        height: 100%;
        width: 100%;
    }
</style>