<template>
    <v-container row wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field
                        v-model="detail.name"
                        label="姓名"
                        :rules="nameRules"
                        :counter="10"
                        required
                        prepend-icon="account_circle"
                ></v-text-field>
                <v-text-field
                        v-model="detail.tel"
                        label="电话"
                        required
                        prepend-icon="phone"
                ></v-text-field>
                <v-select
                        label="住址"
                        v-model="detail.address"
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        required
                        prepend-icon="location_on"
                ></v-select>
                <v-flex xs4>
                    <v-radio-group v-model="detail.sex" :mandatory="false" row prepend-icon="wc">
                        <v-radio label="男" value="1"></v-radio>
                        <v-radio label="女" value="2"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-flex xs4>
                    <v-radio-group v-model="detail.group" :mandatory="false" row prepend-icon="group">
                        <v-radio label="A" value="1"></v-radio>
                        <v-radio label="B" value="2"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-btn color="cyan darken-2" dark @click="back">
                    <v-icon dark left>arrow_back</v-icon>
                    返回
                </v-btn>
                <v-btn :disabled="!valid" @click="submit" color="primary" dark>
                    提交
                    <v-icon dark right>send</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "customer_edit",
        props:{
            data:{type:Object},
        },
        data: () => ({
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            items: [
                'a',
                'b',
            ],
            detail:{},
        }),

        mounted(){
            this.$nextTick(function () {
                this.detail= this.$route.params;
            })
        },

        methods: {
            submit () {
                this.snackBar = {
                    status:true,
                    color:'success',
                    msg:'保存成功',
                }
            },
            back(){
                this.$router.go(-1);
            }
        },
        computed: {
            ...mapGetters({
                snackBarData:'snackbar',
            }),
            snackBar:{
                get() {
                    return this.snackBarData;
                },
                set( value ) {
                    this.$store.commit( 'changeSnackBar', value )
                }
            }
        },

    }
</script>

<style scoped>

</style>