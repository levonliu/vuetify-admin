<template>
    <v-navigation-drawer fixed app v-model="navOpen"
                         class="purple darken-4"
                         dark
    >
            <v-list dense>
                <v-list-tile @click="go('/')" ripple>
                    <v-list-tile-action>
                        <v-icon class="">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="">首页</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="go('/customer')" ripple>
                    <v-list-tile-action>
                        <v-icon>people</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>客户列表</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple @click="go('/goods')">
                    <v-list-tile-action>
                        <v-icon>format_list_bulleted</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>商品列表</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!--<v-list-group prepend-icon="settings" >-->
                <!--<v-list-tile slot="activator">-->
                <!--<v-list-tile-title>设置中心</v-list-tile-title>-->
                <!--</v-list-tile>-->
                <!--<v-list-group sub-group no-action >-->
                <!--<v-list-tile slot="activator">-->
                <!--<v-list-tile-title>商品</v-list-tile-title>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile @click="">-->
                <!--<v-list-tile-title >asasd</v-list-tile-title>-->
                <!--<v-list-tile-action>-->
                <!--<v-icon v-text="people_outline"></v-icon>-->
                <!--</v-list-tile-action>-->
                <!--</v-list-tile>-->
                <!--</v-list-group>-->
                <!--</v-list-group>-->
            </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name:"navigation",
        data:() => ({}),
        computed:{
            ...mapGetters({
                navOpenStatus:'navOpen'
            }),
            navOpen:{
                get(){
                    return this.navOpenStatus;
                },
                set(value){
                    this.$store.commit('changeNavOpen', value)
                }
            }
        },
        methods:{
            go(path){
                this.$router.push(path)
            }
        }
    }
</script>

<style scoped>

</style>