<template>
<Nav />
    <div class="glassmorphism container_central fs10">
        <div class="logo_div">    
            <img src="@/assets/icon-left-font-monochrome-white.png" alt="logo du site Groupomania" class="logo_central"/>
            <h1 hidden> Bienvenue sur le reseau social Groupomania</h1>
        </div>
        <div class="container_home">
            <Creator />
            <Articles />
        </div>   
    </div>
</template>

<script>
import Creator from './post-creator.vue'
import Nav from './nav.vue'
import Articles from './articles.vue'

export default {
  name: 'home',
  components: {
    Nav,
    Creator,
    Articles,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Patua+One&display=swap');

a {
  text-decoration: none;
  font-size: 16px;
}

.logo_div {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 90px;
}

.font {
    font-family: 'Patua One', cursive;
}

.container_home {
  overflow-y: scroll;
  height: 80vh;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.container_home::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.logo_central {
    width: 150px;
}

.home_nav {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 18vw;
    justify-content: space-evenly;
}

.nav_btn {
    transition: all 0.20s ease-in-out;
    cursor: pointer;
}

.nav_btn:hover {
    color: white;
    transform: translateY(-5px);
    transition: all 0.20s ease-in-out;
}

.fs10 {
  font-size: 12px;
  text-align: center;
  padding-top: 10px;
}

.container_central {
  height: 90vh;
  width: 800px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
}

.container_form {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.minima {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.profile_btn {
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 162, 255, 0.5);
  font-size: 18px;
  cursor: pointer;
}

.profile_btn:hover {
    background-color: rgba(4, 221, 250, 0.4);
}

.btn_account_manage {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

</style>
