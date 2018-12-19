<template>
    <v-list>
        <v-subheader>Ice cream sandwich</v-subheader>
        <v-list-tile v-for="tile in data" :key="tile.title" @click="sheet = false">
            <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                    <img :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`" :alt="tile.title">
                </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name:"goodDetail",
        props:{
            sheet:{type:Boolean},
            data:{type:Array},
        },
        data:()=>({
            // sheet:false,
        })
    }
</script>

<style scoped>

</style>