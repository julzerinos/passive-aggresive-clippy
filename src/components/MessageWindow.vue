<template>
    <div ref="draggable" class="window">
        <img src="~@/assets/message.png" />
        <div id="drag-bar" @mousedown="windowBarDrag" />
        <message-text class="text" />
        <div class="scaler" @mousedown="windowScaleDrag" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import MessageText from './MessageText.vue'
import { clamp } from '@/util/math'

@Options({
    name: 'MessageWindow',
    data: function (): any {
        return {
            transformations: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0,
                zoom: 1,
            },
        }
    },
    components: { MessageText },
    mounted: function () {
        this.setDraggablePosition(
            0.4 * window.innerWidth * Math.random(),
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
export default class MessageWindow extends Vue {}
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
    bottom: 55px;
    left: 11px;

    height: 164px;
    width: 509px;

    margin: 0;
    padding: 0;
}
</style>