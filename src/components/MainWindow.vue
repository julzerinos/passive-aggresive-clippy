<template>
    <div class="main">
        <NotepadWindow :zIndex="zIndex" @clicked="switchIndex" />
        <MessageWindow :zIndex="-zIndex" @clicked="switchIndex" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MessageWindow from './MessageWindow.vue'
import NotepadWindow from './NotepadWindow.vue'

@Options({
    components: {
        MessageWindow,
        NotepadWindow,
    },
    data: () => ({
        currentWindow: 0,
        zIndex: 1,
    }),
    methods: {
        switchIndex: function (index: number) {
            this.zIndex = index
        },
    },
})
export default class MainWindow extends Vue {}
</script>

<style scoped>
.main {
    background-color: #008080;
    background-image: url('https://wallpapercave.com/wp/wp2754864.jpg');

    background-size: cover;
    background-position: left;

    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    position: fixed;
}
</style> 