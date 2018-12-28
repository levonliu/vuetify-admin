<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog"
                full-width  transition="dialog-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>商品信息</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="dialog = false">保存</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </v-card>
            <v-list three-line subheader>
            <v-container fluid  fill-height text-xs-center>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md6 lg6 >
                        <v-card>
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                                    height="400px"
                            >
                                <v-container
                                        fill-height
                                        fluid
                                        pa-2
                                >
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline white--text" v-text="123"></span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-img>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm12 md6 lg6 >321</v-flex>
                </v-layout>
            </v-container>
            </v-list>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name:"goodDetail",
        props:{
            openStatus:{type:Boolean},
            data:{type:Array},
        },
        data:()=>({
            dialog:false,
        }),
        watch:{
            openStatus(val){
                this.dialog = val
            },
            dialog(val){
                this.$emit('update:openStatus', val)
            }
        }
    }
</script>

<style scoped>

</style>