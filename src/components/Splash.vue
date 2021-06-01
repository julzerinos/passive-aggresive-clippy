<template>
    <div class="main">
        <div class="loader" />
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class Splash extends Vue {}
</script>

<style scoped>
.main {
    background-image: url('../assets/splash/splash.png');
    background-size: cover;
    background-position: center;

    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    position: fixed;

    z-index: 100;
}

.loader {
    position: absolute;
    bottom: 0px;

    width: 100%;
    height: 30px;

    background: linear-gradient(
        90deg,
        rgba(78, 127, 184, 1) 0%,
        rgba(173, 185, 192, 1) 50%,
        rgba(78, 127, 184, 1) 100%
    );
    background-repeat: repeat-x;
    animation: scroll-x 2s linear infinite;
}

@keyframes scroll-x {
    0% {
        background-position-x: 100vw;
    }
    100% {
        background-position-x: 0vw;
    }
}
</style>