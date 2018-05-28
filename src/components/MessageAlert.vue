<template>
    <v-alert :type="msgOpen.type" :value="msgOpen.value" :transition="transition">
        {{msgOpen.msg}}
    </v-alert>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name    : "message-alert",
        data    : () => ({
            transition:'slide-y-transition'
        }),
        computed: {
            ...mapGetters( {
                msgAlert: 'msgOpen'
            } ),
            msgOpen: {
                get() {
                    return this.msgAlert;
                }
            },
        }
    }
</script>

<style scoped>

</style>