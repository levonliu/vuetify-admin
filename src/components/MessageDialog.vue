<template>
    <v-layout row justify-center>
        <v-dialog v-model="mesDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{mesHeadText}}</v-card-title>
                <v-card-text>{{mesContent}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <slot :id="id"></slot>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name:"MessageDialog",
        props:{
            mesDialog:{type:Boolean},
            mesHeadText:{type:String},
            mesContent:{type:String},
            id:{type:Number},
        },
    }
</script>

<style scoped>

</style>