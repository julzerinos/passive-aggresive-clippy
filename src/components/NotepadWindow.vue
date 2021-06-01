<template>
    <div
        ref="draggable"
        :style="{ zIndex: zIndex }"
        class="window"
        @mousedown="() => $emit('clicked', 1)"
    >
        <img src="~@/assets/notepad.png" />
        <div id="drag-bar" @mousedown="windowBarDrag" />
        <div class="text">
            {{ placeholder }}
            <br />
            See the source code on
            <a href="https://github.com/julzerinos/passive-aggresive-clippy"
                >Github</a
            >
        </div>
        <div class="scaler" @mousedown="windowScaleDrag" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import { clamp } from '@/util/math'

@Options({
    name: 'NotepadWindow',
    props: {
        zIndex: { required: true },
    },
    data: function (): any {
        return {
            transformations: {
                clientX: 0,
                clientY: 0,
                movementX: 0,
                movementY: 0,
                zoom: 1,
            },
            placeholder: `Welcome to Passive Aggresive Clippy.

Clippy is back and he's here to help you (albeit passive-aggressively) with your emails – so that you can be absolutely sure your messages are as friendly as humanely possible (which is probably not that much). Go ahead and type away with your beautiful words - watch for the highlighted sections and click them, so that Clippy can help you with the rest!
                
This is a small project as a tribute to the wonderful things I've read in the corporate email thread lifecycles. Here is to me hoping that my friends and co-workers will stumble upon a tool to help them notice the little things.
                `,
        }
    },
    mounted: function () {
        this.setDraggablePosition(
            window.innerWidth - 750,
            0.4 * window.innerHeight * Math.random(),
        )
    },
    methods: {
        windowBarDrag: function (event: MouseEvent) {
            this.transformations.clientX = event.clientX
            this.transformations.clientY = event.clientY
            document.onmousemove = (event: MouseEvent) => {
                event.preventDefault()
                this.setDraggablePosition(event.clientX, event.clientY)
            }
            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null
            }
        },
        windowScaleDrag: function (event: MouseEvent) {
            this.transformations.clientX = event.clientX
            this.transformations.clientY = event.clientY
            document.onmousemove = (event: MouseEvent) => {
                event.preventDefault()
                this.setScale(event.clientX, event.clientY)
            }
            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null
            }
        },
        setDraggablePosition: function (x: number, y: number) {
            this.transformations.movementX =
                x <= 0 || x >= innerWidth ? 0 : this.transformations.clientX - x
            this.transformations.movementY =
                y <= 0 || y >= innerHeight
                    ? 0
                    : this.transformations.clientY - y
            this.transformations.clientX = x
            this.transformations.clientY = y

            this.$refs.draggable.style.top =
                this.$refs.draggable.offsetTop -
                this.transformations.movementY +
                'px'
            this.$refs.draggable.style.left =
                this.$refs.draggable.offsetLeft -
                this.transformations.movementX +
                'px'
        },
        setScale: function (x: number, y: number) {
            this.transformations.movementX = this.transformations.clientX - x
            this.transformations.movementY = this.transformations.clientY - y
            this.transformations.clientX = x
            this.transformations.clientY = y

            this.transformations.zoom = clamp(
                this.transformations.zoom +
                    0.01 * -Math.sign(this.transformations.movementX),
                0.75,
                1.5,
            )
            this.$refs.draggable.style.zoom = this.transformations.zoom
        },
    },
})
export default class NotepadWindow extends Vue {}
</script>

<style scoped>
.window {
    position: absolute;
    z-index: 10;
    background: transparent;
    zoom: 1;
}

.scaler {
    position: absolute;
    height: 30px;
    width: 30px;
    background: transparent;
    right: 0;
    bottom: 0;
}

.scaler:hover {
    cursor: nw-resize;
}

img {
    image-rendering: pixelated;
    z-index: 5;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

#drag-bar {
    position: absolute;
    top: 0;
    z-index: 200;
    width: 100%;
    height: 5%;
    background: transparent;
}

#drag-bar:hover {
    cursor: grab;
}

#drag-bar:active {
    cursor: grabbing;
}

.text {
    position: absolute;
    top: 44px;
    left: 6px;

    height: 351px;
    width: 660px;

    margin: 0;
    padding: 0;

    background: transparent;

    resize: none;

    color: black;

    overflow-y: auto;

    box-sizing: border-box;

    border: solid 4px transparent;

    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;

    white-space: pre-wrap;
}

.text:focus {
    outline: none !important;
}
</style>