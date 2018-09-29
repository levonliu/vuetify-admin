<template>
    <v-app id="inspire" class="login">
        <v-content>
            <v-container fluid fill-height>
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
                                            v-model="loginName"
                                            :rules="loginRules"
                                            required></v-text-field>
                                    <v-text-field prepend-icon="lock"
                                            name="password"
                                            label="Password"
                                            v-model="password"
                                            :rules="passwordRules"
                                            :append-icon="showPwd ? 'visibility_off':'visibility'"
                                            :append-icon-cb="() => (showPwd = !showPwd)"
                                            :type="showPwd ? 'text':'password'"
                                            required></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="clear">clear</v-btn>
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs0 sm1 md1></v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            showPwd:false,
            loginName:'',
            loginRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            password:'',
            passwordRules: [
                v => !!v || 'password is required',
            ],
        }),
        methods:{
            login(e){
                let _this = this;
                e.preventDefault();
                // if (this.$refs.loginForm.validate()) {
                //     this.$http.post('/login', {
                //         username: this.loginName,
                //         password: this.password,
                //     }).then(function () {
                        _this.$router.push('/');
                //     })
                // }
            },
            clear(){
                this.$refs.loginForm.reset();
            }
        }
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