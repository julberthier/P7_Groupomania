<template>
  <div class="glassmorphism container_central fs10">
    <div class=" container_form">
      <span @click="goBack()" class="back_btn">⬅️ Retour à l'accueil </span> 
      <div class="font">Mon espace perso</div>
      <div > 
        <div>
          <span>{{ user.username }}</span>
          <span>{{ user.email }}</span>
      </div>
        <img :src='user.photo'/>
        <div>{{ user.bio }}
        </div>
      </div>

      <span class="btn_account_manage">
        <button class="profile_btn minima font" @click="modify()">Modifier mon compte</button>
        <button class="profile_btn minima font" @click="deleteUser()">Supprimer mon compte</button>
      </span>

    </div>   
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'profile',
  mounted: function (){
    console.log(this.$store.state.user);
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return;
    }
      this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  }
  ,methods: {
    modify: function () {
        // const self =  this;
        // this.$store.dispatch('modify', {
        //   email: this.email,
        //   username: this.username,
        //   password: this.password
        // })
        // .then(function(response) {
        // console.log(response);
        // })
        // .catch(function(error) {
        //   console.log(error);
        // })
    },
    deleteUser: function () {
        // const self =  this;
        // this.$store.dispatch('delete', {
        //   email: this.email,
        //   username: this.username,
        //   password: this.password
        // })
        // .then(function(response) {
        // console.log(response);
        // })
        // .catch(function(error) {
        //   console.log(error);
        // })
    },
    goBack: function() {
    this.$router.push('/home');
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

.font {
  font-family: 'Patua One', cursive;
}

img {
  width: 100px;
}

.back_btn {
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 15px;
}

.fs10 {
  font-size: 12px;
  text-align: center;
  padding-top: 10px;
}

.container_central {
  height: 50vh;
  width: 800px;
  border-radius: 10px;
  display: flex;
  justify-content: center;  
  flex-direction: column;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
}

.container_form {
  height: 60%;
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
