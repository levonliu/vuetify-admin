<template>
    <v-navigation-drawer fixed clipped app v-model="navOpen">
        <v-list dense>
            <v-list-tile @click="go('/')" ripple>
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="go('/customer')" ripple>
                <v-list-tile-action>
                    <v-icon>people</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Customers</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple @click="go('/')">
                <v-list-tile-action>
                    <v-icon>format_list_bulleted</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Goods</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <!--<v-list-group prepend-icon="contact_mail">-->
                <!--<v-list-tile slot="activator">-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>-->
                            <!--Customer-->
                        <!--</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile @click="">-->
                    <!--<v-list-tile-action>-->
                        <!--<v-icon>person_add</v-icon>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>Customer_add</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile @click="">-->
                    <!--<v-list-tile-action>-->
                        <!--<v-icon>view_headline</v-icon>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>Customer_list</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
            <!--</v-list-group>-->
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name    : "navigation",
        data    : () => ({

        }),
        computed:{
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
            go(path){
                this.$router.push( path )
            }
        }
    }
</script>

<style scoped>

</style>