<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">客户信息</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md4>
                                <v-text-field label="姓名*" required v-model="customerData.name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md8>
                                <v-text-field label="电话*" required v-model="customerData.tel"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="住址" v-model="customerData.address"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm4 md6>
                                <v-select
                                        :items="['男', '女']"
                                        label="性别"
                                        v-model="customerData.sex"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm4 md6>
                                <v-select
                                        :items="['A', 'B']"
                                        label="组"
                                        v-model="customerData.group_name"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*必填项</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan darken-2" dark @click.native="dialog = false">
                        <v-icon dark left>close</v-icon>
                        关闭
                    </v-btn>
                    <v-btn @click="save()" color="primary" dark>
                        保存
                        <v-icon dark right>send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    export default {
        props   :{
            dialogStatus:{type:Boolean},
            customerData:{type:Object}
        },
        data(){
            return {
                dialog:false
            }
        },
        methods :{
            save(){
                this.dialog   = false;
                // let _this = this;
                // _this.$http.post('/customer',this.customerData).then(function(response){
                //    // console.log(response);
                // });
                this.$store.dispatch('showMessage',{status:true,type:'success',msg:"保存成功"})
            }
        },
        computed:{

        },
        watch:{
            dialogStatus(val){
                this.dialog = val;
            },
            dialog(val){
                this.$emit('update:dialogStatus', val)
            }
        }
    }
</script>