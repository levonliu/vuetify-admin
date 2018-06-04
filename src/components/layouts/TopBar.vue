<template>
    <v-toolbar color="indigo" dark fixed app clipped-left>
        <v-toolbar-side-icon @click.stop="navOpen = !navOpen"></v-toolbar-side-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-snackbar
                :timeout="snackBar.time"
                :color="snackBar.color"
                v-model="snackBar.status"
                top="top"
                style="position: relative"
        >
            {{snackBar.msg}}
            <v-btn dark flat @click.native="snackBar.status = !snackBar.status">Close</v-btn>
        </v-snackbar>
        <v-spacer></v-spacer>
        <v-speed-dial right="right" direction="left" transition="scale-transition">
            <v-btn slot="activator" color="blue darken-2" dark fab hover>
                <v-icon>account_circle</v-icon>
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
    import { mapGetters } from 'vuex'

    export default {
        data    : () => ({
        }),
        computed: {
            ...mapGetters({
                navOpenStatus:'navOpen',
                snackBarData:'snackbar',
            }),
            navOpen:{
                get() {
                    return this.navOpenStatus;
                },
                set( value ) {
                    this.$store.commit( 'changeNavOpen', value )
                }
            },
            snackBar:{
                get() {
                    return this.snackBarData;
                },
                set( value ) {
                    this.$store.commit( 'changeSnackBar', value )
                }
            }
        },
        methods : {
            logout() {
                // this.$router.push( '/login' )
            }
        },
        components:{
        }
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