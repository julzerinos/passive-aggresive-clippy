<template>
    <div>
        <div
            class="copy"
            v-for="{ splits, id, phrase } of marks"
            :ref="`${id}`"
            :key="id"
        >
            {{ splits[0]
            }}<mark
                @mouseover="(e) => onClickMark(e, phrase)"
                :style="generateMarkStyle(phrase.strength)"
                @click="(e) => onClickMark(e, phrase)"
                >{{ splits[1] }}</mark
            >{{ splits[2] }}{{ message.slice(-1) === '\n' ? '\n.' : '' }}
        </div>

        <textarea
            ref="text"
            id="text"
            v-model="message"
            @input="messageChanged"
            placeholder="Start typing your email message..."
            :onscroll="scrollAll"
        />

        <Clippy ref="clippy" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Clippy from './Clippy.vue'

import { strengths } from '@/util/phrases'
import { parseMarksIntoDOM } from '@/util/parse'
import { Mark } from '@/types/Mark'
import { Phrase } from '@/types/Phrase'

@Options({
    name: 'MessageText',
    data: function (): any {
        return {
            message: '',
            agent: null,
            agentShown: false,
        }
    },
    components: {
        Clippy,
    },
    updated(): void {
        this.scrollAll()
    },
    methods: {
        generateMarkStyle: (strength: number): any => ({
            backgroundColor: strengths[strength],
            opacity: 0.66,
        }),
        onClickMark: function (event: MouseEvent, phrase: Phrase): void {
            this.$refs.clippy.move(event.clientX, event.clientY)
            this.$refs.clippy.speak(phrase.why)

            this.click(event.clientX, event.clientY)
        },
        click: function (x: number, y: number): void {
            const ev = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                screenX: x,
                screenY: y,
            })

            this.$refs.text.dispatchEvent(ev)
        },
        scrollAll: function (): void {
            for (const c of this.marks)
                if (c.id in this.$refs)
                    this.$refs[c.id].scrollTo(0, this.$refs.text.scrollTop)
        },
    },
    computed: {
        marks: function (): Array<Mark> {
            return parseMarksIntoDOM(this.message)
        },
    },
})
export default class MessageText extends Vue {}
</script>

<style scoped>
mark {
    pointer-events: all;
}

mark:hover {
    background-color: blue;
}

#text {
    background: transparent;

    resize: none;

    padding: 0;

    color: black;
}

#text:focus {
    outline: none !important;
}

#text:active {
    pointer-events: none;
}

#text,
.copy {
    overflow-y: auto;
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

.copy {
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

.copy::-webkit-scrollbar {
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