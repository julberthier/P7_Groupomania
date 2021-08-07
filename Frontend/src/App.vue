<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  background: linear-gradient(153deg, rgba(209,81,90,1) 50%, rgba(9,31,67,1) 100%);
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
