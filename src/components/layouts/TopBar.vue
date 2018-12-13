<template>
    <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="changeNavOpen"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-snackbar :timeout="snackBar.time" :color="snackBar.type" v-model="snackBar.status" top="top"
                style="position: relative">
            {{snackBar.msg}}
            <v-btn dark flat @click="closeMessage">
                Close
            </v-btn>
        </v-snackbar>
        <v-spacer></v-spacer>
        <v-speed-dial right="right" direction="left" transition="scale-transition">
            <v-btn slot="activator" color="blue darken-2" dark fab hover>
                <v-avatar :tile="false" color="grey lighten-4">
                    <img src="../../../public/static/images/avatar.jpg" alt="avatar">
                </v-avatar>
            </v-btn>
            <v-tooltip bottom>
                <v-btn fab dark small color="green" slot="activator">
                    <v-icon>lock</v-icon>
                </v-btn>
                <span>修改密码</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn fab dark small color="red" @click="logout" slot="activator">
                    <v-icon>keyboard_backspace</v-icon>
                </v-btn>
                <span>登出</span>
            </v-tooltip>
        </v-speed-dial>
    </v-toolbar>
</template>

<script>
    export default {
        data    : () => ({}),
        computed: {
            snackBar() {
                return this.$store.state.snackBar
            }
        },
        methods : {
            changeNavOpen() {
                let status = !this.$store.state.nav.status;
                this.$store.dispatch('changeNavOpen', status)
            },
            closeMessage(){
                this.$store.dispatch('closeMessage')
            },
            logout() {
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>
    .speed-dial {
        position: absolute;
    }

    .btn--floating {
        position: relative;
    }
</style>