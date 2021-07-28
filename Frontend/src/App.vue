<template>
  <img src="./assets/icon-left-font-monochrome-white.png" alt="" class="logo">
  <homepage />
</template>

<script>
import homepage from './components/homepage.vue'

export default {
  name: 'App',
  components: {
    homepage
  }
}
</script>

<style>

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  width: 250px;
  position: fixed;
  top: 90px;
  left: 435px;
  z-index: -1;
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {  
  background: #ef32d9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #89fffd, #ef32d9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #89fffd, #ef32d9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  width: 100%;
}
</style>
