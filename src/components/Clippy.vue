<template>
    <div></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import clippy from 'clippyjs'
import $ from 'jquery'

@Options({
    data: function () {
        return {
            agent: null,
            showAgent: false,
        }
    },
    mounted() {
        clippy.load('Clippy', this.load, (): void =>
            console.error('clippy failed for some god forsaken reason'),
        )
    },
    methods: {
        load: function (agent: any) {
            this.agent = agent
            $('.clippy').css('pointer-events', 'none')
            $('.clippy-balloon').css('pointer-events', 'none')
        },
        speak: function (message: string) {
            this.agent.speak(message)
        },
        move: function (x: number, y: number): void {
            if (!this.showAgent) this.show()
            this.agent.moveTo(x, y)
        },
        show: function (): void {
            this.agent.show(false)
            this.showAgent = true
        },
    },
})
export default class Clippy extends Vue {}
</script>

<style src='@/assets/clippy/clippy.css'>
</style>