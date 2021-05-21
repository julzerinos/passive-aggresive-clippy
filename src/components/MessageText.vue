<template>
    <div ref="parent">
        <textarea
            id="text"
            v-model="message"
            @input="messageChanged"
            placeholder="Start typing your email message..."
        />
        <div ref="copy" id="copy" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { parseMarks } from '@/util/parse'

@Options({
    name: 'MessageText',
    data: function (): any {
        return {
            message: null,
        }
    },
    methods: {
        messageChanged: function (e: InputEvent): void {
            // on message change by textarea event
        },
        updateCopy: function (newMessage: string): void {
            this.$refs.copy.innerHTML = parseMarks(newMessage)
        },
    },
    watch: {
        message: function (v: string): void {
            this.updateCopy(v)
        },
    },
})
export default class MessageText extends Vue {}
</script>

<style scoped>
#text {
    width: 100%;
    height: 100%;

    box-sizing: border-box;

    overflow: auto;
    background: transparent;

    resize: none;

    padding: 0;

    color: red;
}

#text:focus {
    outline: none !important;
}

#text,
#copy {
    border: solid 4px transparent;

    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
}

#copy {
    position: absolute;
    top: 0;
    left: 0;

    white-space: pre;

    color: transparent;
}

textarea::-webkit-scrollbar {
    width: 17px;
}

textarea::-webkit-scrollbar-button:single-button {
    image-rendering: pixelated;
    width: 17px;
    background-repeat: no-repeat;
}

textarea::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url('~@/assets/scrollbar/button_up.png');
    height: 17px;
}

textarea::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url('~@/assets/scrollbar/button_down.png');
    height: 16px;
}

textarea::-webkit-scrollbar-track {
    image-rendering: pixelated;
    background-image: url('~@/assets/scrollbar/bg.png');
}

textarea::-webkit-scrollbar-thumb {
    image-rendering: pixelated;
    background-image: url('~@/assets/scrollbar/bar.png');
    background-repeat: no-repeat;
}
</style>