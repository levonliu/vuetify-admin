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
                            <v-form ref="customerForm" v-model="valid" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md4>
                                        <v-text-field label="姓名*" :rules="nameRules"
                                                v-model="customerInfo.name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md8>
                                        <v-text-field label="电话*" :rules="telRules" required
                                                v-model="customerInfo.tel"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field label="住址" v-model="customerInfo.address"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md6>
                                        <v-select
                                                :items="['男', '女']"
                                                label="性别"
                                                v-model="customerInfo.sex_name"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm4 md6>
                                        <v-select
                                                :items="['普通', 'VIP']"
                                                label="等级"
                                                v-model="customerInfo.level_name"
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                            </v-form>
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
    import {customerSave} from '@/api/customer'

    export default {
        props   : {
            dialogStatus: {type: Boolean},
            customerData: {type: Object}
        },
        data() {
            return {
                customerInfo: {},
                dialog      : false,
                valid       : true,
                nameRules   : [
                    v => !!v || 'Name is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                telRules    : [
                    v => !!v || 'telephone is required',
                ]
            }
        },
        methods : {
            save() {
                if(this.$refs.customerForm.validate()) {
                    customerSave(this.customerInfo).then(response => {
                        this.dialog = false
                        if(response.data.success) {
                            this.$store.dispatch('showMessage', {status: true, type: 'success', msg: "保存成功"})
                        }
                    }).catch(error => {
                        reject(error)
                    })
                    let _this = this
                    setTimeout(function() {
                        _this.$emit('refresh')
                    }, 1000)
                }
            }
        },
        computed: {},
        watch   : {
            customerData(val) {
                this.customerInfo            = this.$deepCopy(val);
                this.customerInfo.sex_name   = this.customerInfo.sex_name ? this.customerInfo.sex_name : '男'
                this.customerInfo.level_name = this.customerInfo.level_name ? this.customerInfo.level_name : '普通'
            },
            dialogStatus(val) {
                this.dialog = val;
            },
            dialog(val) {
                this.$emit('update:dialogStatus', val)
            }
        }
    }
</script>