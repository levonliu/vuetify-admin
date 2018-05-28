<template>
    <v-app>
        <navigation></navigation>
        <topBar></topBar>
        <v-content>
            <v-container align-content-space-between align-content-center>
                <transition name="fade">
                    <router-view/>
                </transition>
            </v-container>
        </v-content>
        <v-footer></v-footer>
    </v-app>
</template>

<script>
    import topBar from "../components/layouts/TopBar";
    import Footer from "../components/layouts/Footer";
    import navigation from "../components/layouts/Navigation";

    export default {
        data      : () => ({}),
        methods   : {},
        components: {
            topBar,
            'v-footer': Footer,
            navigation,
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease;
    }
    .fade-enter, .fade-leave-to {
        transform: translateX(50px);
        opacity: 0;
    }
</style>