<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name:'app',
    }
</script>

<style>
    html {
        overflow-y: auto!important;
    }

    .v-overlay--active:before {
        opacity: 0.1!important;
    }
</style>
