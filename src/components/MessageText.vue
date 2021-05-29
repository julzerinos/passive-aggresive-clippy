<template>
    <div>
        <div id="copy" :ref="`${mark[3]}`" v-for="mark of marks" :key="mark[3]">
            {{ mark[0] }}<mark @click="onClickMark">{{ mark[1] }}</mark
            >{{ mark[2] }}{{ message.slice(-1) === '\n' ? '\n.' : '' }}
        </div>

        <textarea
            ref="text"
            id="text"
            v-model="message"
            @input="messageChanged"
            placeholder="Start typing your email message..."
            :onscroll="scrollAll"
        />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { parseMarksIntoDOM } from '@/util/parse'

@Options({
    name: 'MessageText',
    data: function (): any {
        return {
            message: '',
        }
    },
    updated() {
        this.scrollAll()
    },
    methods: {
        messageChanged: function (e: InputEvent): void {
            // on message change by textarea event
        },
        onClickMark: function (event: MouseEvent) {
            console.log(event)

            // this.$refs.text.setCaretPosition(0)

            // document.elementFromPoint(event.clientX, event.clientY)?.click()
            this.click(event.clientX, event.clientY)
        },
        click: function (x: number, y: number) {
            const ev = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                screenX: x,
                screenY: y,
            })

            this.$refs.text.dispatchEvent(ev)
        },
        scrollAll: function () {
            for (const c of this.marks)
                if (c[3] in this.$refs)
                    this.$refs[c[3]].scrollTo(0, this.$refs.text.scrollTop)
        },
    },
    computed: {
        marks: function () {
            return parseMarksIntoDOM(this.message)
        },
    },
    watch: {
        message: function (v: string): void {
            v
        },
    },
})
export default class MessageText extends Vue {}
</script>

<style scoped>
mark {
    color: transparent;
    background-color: #00d9ff4d;

    pointer-events: all;
}

mark:hover {
    background-color: blue;
}

#text {
    overflow: auto;
    background: transparent;

    resize: none;

    padding: 0;

    color: black;
}

#text:focus {
    outline: none !important;
}

#text,
#copy {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

    box-sizing: border-box;

    border: solid 4px transparent;

    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
}

#copy {
    overflow-y: auto;

    word-wrap: break-word;
    white-space: pre-wrap;

    color: transparent;

    pointer-events: none;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

div::-webkit-scrollbar {
    background-color: transparent;
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