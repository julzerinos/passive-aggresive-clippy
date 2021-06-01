<template>
    <div></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import clippy from 'clippyjs'

@Options({
    data: function () {
        return {
            agent: null,
        }
    },
    mounted() {
        clippy.load(
            'Clippy',
            (agent: any) => {
                agent.show()
                this.agent = agent
            },
            () => console.error('clippy failed for some god forsaken reason'),
        )
    },
    methods: {
        speak: function (message: string) {
            this.agent.speak(message)
        },
        move: function (x: number, y: number): void {
            this.agent.moveTo(x, y)
        },
    },
})
export default class Clippy extends Vue {}
</script>

<style src='@/assets/clippy/clippy.css'>
</style>