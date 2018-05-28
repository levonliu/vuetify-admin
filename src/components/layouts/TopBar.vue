<template>
    <v-toolbar color="indigo" dark fixed app clipped-left>
        <v-toolbar-side-icon @click.stop="navOpen = !navOpen"></v-toolbar-side-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
        <v-speed-dial :right="right" :direction="direction" :open-on-hover="hover" :transition="transition">
            <v-btn slot="activator" color="blue darken-2" dark fab hover>
                <v-icon>account_circle</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="logout">
                <v-icon>keyboard_backspace</v-icon>
            </v-btn>
        </v-speed-dial>
    </v-toolbar>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data    : () => ({
            direction : 'left',
            right     : true,
            hover     : false,
            transition: 'scale-transition'
        }),
        computed: {
            ...mapGetters({
                navOpenStatus:'navOpen'
            }),
            navOpen:{
                get() {
                    return this.navOpenStatus;
                },
                set( value ) {
                    this.$store.commit( 'changeNavOpen', value )
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