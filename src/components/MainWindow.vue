<template>
    <div class="main">
        <MessageWindow />
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import MessageWindow from './MessageWindow'

@Options({
    components: {
        MessageWindow,
    },
})
export default class MainWindow extends Vue {}
</script>

<style scoped>
.main {
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