<template>
<nav class="home_nav">
  <div @click="user()" class="nav_btn">Mon compte</div>
  <div @click="logout()" class="nav_btn">Déconnexion</div>
</nav>

    <div class="glassmorphism container_central fs10">
        <div class="logo_div">    
            <img src="@/assets/icon-left-font-monochrome-white.png" alt="" class="logo_central"/>
        </div>
        <div class=" container_form">
            C'est bien la page d'accueil
        </div>   
    </div>
</template>

<script>

export default {
  name: 'home',
  props: {
    msg: String,    
  }, data : function ()  {
    return { 
    signed: true,
    }
  }, computed : {
  }, methods: {
    user: function () {
        this.$router.push('/profile');

        // const self =  this;
        // this.$store.dispatch('user', {
        //     id: this.id,
        //     email: this.email,
        //     username: this.username,
        //     password: this.password
        // })
        // .then(function() {
        //     self.$router.push('/profile')
        // })
        // .catch(function(error) {
        //     console.log(error);
        // })
    }, 
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

.logo_central {
    width: 150px;
}

.home_nav {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 250px;
    justify-content: space-evenly;
    font-family: 'Patua One', cursive;
}

.nav_btn {
    cursor: pointer;
}

.nav_btn:hover {
    color: rgba(63, 177, 230, 0.35);
}

.fs10 {
  font-size: 12px;
  text-align: center;
  padding-top: 10px;
}

.container_central {
  height: 80vh;
  width: 800px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
  font-family: 'Patua One', cursive;
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
