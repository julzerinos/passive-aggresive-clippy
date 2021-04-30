<template>
    <!-- <textarea v-model="message" /> -->
    <div ref="text" contenteditable="true" @input="messageChanged">
        {{ message }}<mark>asd</mark>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    name: 'MessageText',
    data: function () {
        return {
            message: 'fawdasd',
        }
    },
    methods: {
        messageChanged: function (e: InputEvent) {
            this.message = this.$refs.text.innerText
        },
    },
    watch: {
        message: function (v) {
            console.log(v)
        },
    },
})
export default class MessageText extends Vue {}
</script>

<style scoped>
div {
    box-sizing: border-box;
    border: solid 4px transparent;

    resize: none;
}

div:focus {
    outline: none !important;
}

::-webkit-scrollbar {
    width: 17px;
}

::-webkit-scrollbar-button:single-button {
    image-rendering: pixelated;
    width: 17px;
    background-repeat: no-repeat;
}

::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url('~@/assets/scrollbar/button_up.png');
    height: 17px;
}

::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url('~@/assets/scrollbar/button_down.png');
    height: 16px;
}

::-webkit-scrollbar-track {
    image-rendering: pixelated;
    background-image: url('~@/assets/scrollbar/bg.png');
}

::-webkit-scrollbar-thumb {
    image-rendering: pixelated;
    background-image: url('~@/assets/scrollbar/bar.png');
    background-repeat: no-repeat;
}
</style>