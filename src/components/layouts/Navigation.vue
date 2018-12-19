<template>
    <v-navigation-drawer fixed app v-model="navStatus.status"
                         class="purple darken-4"
                         dark
    >
            <v-list dense>
                <div v-for="(value,key) in menus" :key="key">
                    <v-list-tile @click="go(value.path)" ripple>
                        <v-list-tile-action>
                            <v-icon class="">{{value.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="">{{value.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </div>
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
            },
            menus(){
              return this.$store.state.app.menus;
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