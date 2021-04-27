<template>
    <MainWindow/>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';
    import MainWindow from "@/components/MainWindow.vue";

    @Options({
        components: {
            MainWindow,
        },
    })

    export default class App extends Vue {
    }
</script>

<style>
    #app {

    }
</style>
