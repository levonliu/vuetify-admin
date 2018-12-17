<template>
    <v-navigation-drawer fixed app v-model="navStatus.status"
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
            </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name:"navigation",
        data:() => ({}),
        computed:{
            navStatus(){
                return this.$store.state.nav;
            }
        },
        methods:{
            go(path){
                this.$router.push(path)
            }
        },
        mounted(){
            // 初始化菜单
            this.$store.dispatch("getMenu");
        }
    }
</script>

<style scoped>

</style>