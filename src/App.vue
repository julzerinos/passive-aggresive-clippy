<template>
    <div>
        <Splash v-show="showSplash" />
        <MainWindow v-show="!showSplash" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MainWindow from '@/components/MainWindow.vue'
import Splash from '@/components/Splash.vue'

@Options({
    components: {
        MainWindow,
        Splash,
    },
    data: (): any => ({
        showSplash: process.env.NODE_ENV === 'production',
    }),
    mounted: function (): void {
        setTimeout(this.closeSplash, 2500)
    },
    methods: {
        closeSplash: function (): void {
            this.showSplash = false
        },
    },
})
export default class App extends Vue {}
</script>

<style>
</style>
