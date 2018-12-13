<template>
    <v-app id="inspire" class="login">
        <v-content>
            <v-container fluid fill-height>
                <v-layout row wrap>
                    <v-flex xs12 style="height: 5px">
                        <v-snackbar :timeout="snackBar.time" :color="snackBar.type" v-model="snackBar.status" top="top"
                                style="position: relative">
                            {{snackBar.msg}}
                            <v-btn dark flat @click="closeMessage">
                                Close
                            </v-btn>
                        </v-snackbar>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout align-center justify-center>
                            <v-flex xs0 sm7 md8></v-flex>
                            <v-flex xs12 sm4 md3>
                                <v-card class="elevation-12" >
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title>Login</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form ref="loginForm" v-model="valid" lazy-validation>
                                            <v-text-field prepend-icon="person"
                                                    name="login"
                                                    label="Name"
                                                    :counter="10"
                                                    v-model="loginForm.username"
                                                    :rules="loginRules.username"
                                                    required
                                                    @keydown.enter.native="login"
                                            >
                                            </v-text-field>
                                            <v-text-field prepend-icon="lock"
                                                    name="password"
                                                    label="Password"
                                                    v-model="loginForm.password"
                                                    :rules="loginRules.password"
                                                    :append-icon="showPwd ? 'visibility_off':'visibility'"
                                                    @click:append="() => (showPwd = !showPwd)"
                                                    :type="showPwd ? 'text':'password'"
                                                    required
                                                    @keydown.enter.native="login"
                                            >
                                            </v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="clear">clear</v-btn>
                                        <v-btn color="primary" @click="login" >Login</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex xs0 sm1 md1></v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {login} from '@/api/user'

    export default {
        data: () => ({
            valid: false,
            showPwd:false,
            loginForm: {
                username:'',
                password:'',
            },
            loginRules:{
                username: [
                    v => !!v || 'Name is required',
                    v => v.length <= 10 || 'Name must be less than 10 characters'
                ],
                password: [
                    v => !!v || 'password is required',
                ],
            }
        }),
        methods:{
            login(){
                if (this.$refs.loginForm.validate()) {
                    this.$store.dispatch('login',this.loginForm).then(() => {
                        this.$store.dispatch('showMessage',{status:true,type:'success',msg:"登陆成功"})
                        const _this = this;
                        setTimeout(function() {
                            _this.$router.push('/');
                        }, 2000)
                    })
                }
            },
            clear(){
                this.$refs.loginForm.reset();
            },
            closeMessage(){
                this.$store.dispatch('closeMessage')
            },
        },
        computed: {
            snackBar() {
                return this.$store.state.snackBar
            }
        },
    }
</script>

<style scoped>
    #inspire{
        width: 100%;
        height: 100%;
        background: url("/static/images/login.jpg") no-repeat;
        background-size: cover;
        background-position: center;
        position: absolute;
    }
</style>