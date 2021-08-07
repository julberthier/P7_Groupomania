<template>
  <div class="logo_login"></div>
  <div class="glassmorphism container_central fs10">
    <div class=" container_form">

        <p class="form_title font" v-if="signed == true">CONNEXION</p>
        <p class="form_title font" v-else>INSCRIPTION</p>

        <p class="form_info" v-if="signed == true">Tu n'as pas encore de compte ? <span v-on:click="signIn()" class="account">Créer un compte</span></p>
        <p class="form_info" v-else>Tu as déjà un compte ? <span v-on:click="loggedIn()" class="account">Se connecter</span></p>
        
          <div class="form_container_size"> 
            <form action="" class="form_style">              
              <input type="text" class="input_style minima"  placeholder="Nom d'utilisateur" v-if="signed == false" v-model="username">         
              <input type="text" placeholder="Adresse email" class="input_style minima" v-model="email">
              <input type="password" name="" id="" placeholder="Mot de passe" class="input_style minima password" v-model="password">
              <span class="passwordHide" v-if="signed == false"></span>
              <div v-if="signed === true && status == 'error_login'">
                Attention, adresse mail et/ou mot de passe invalide(s).
              </div>
              <button type="button" class="form_btn minima font" v-if="signed == true" @click="login()">
                <span v-if="status == 'loading'"> Connexion en cours...</span>
                <span v-else>Connexion</span>
              </button>
              <button type="button" class="form_btn minima font" v-else @click="signUp()">S'inscrire</button>     
            </form>
          </div>
    </div>   
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login', 
  data : function ()  {
    return { 
    signed: true,
    username: '',
    email: '',
    password: '',
    }
  },
  mounted: function() {
      if (this.$store.state.user.id != -1) {
      this.$router.push('/home');
      return;
    }
  },
  computed : {
    ...mapState(['status'])
  }, 
  methods: {
      signIn: function () {
        this.signed = false;
      },
      loggedIn: function() {
        this.signed = true;
      },
      login: function(){
        const self =  this;
        this.$store.dispatch('login', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(function() {
          self.$router.push('/home');
        })
        .catch(function(error) {
          console.log(error);
        })
      },
      signUp: function () {
        const self =  this;
        this.$store.dispatch('signUp', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(function() {
          self.login();
        })
        .catch(function(error) {
          console.log(error);
        })
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

img {
  width: 100px;
}

.fs15 {
    font-size: 14px;
}

.logo_login {
  width: 250px;
  position: fixed;
  top: 90px;
  left: 435px;
  z-index: -1;
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

.logo_login::before{
  display: inline-block;
  content: '';
  position: absolute;
  top: 40px;
  right: 40px;
  background-size: 180px 180px;
  height:180px;
  width:180px;
  background-image: url('../assets/icon-left-font-monochrome-white.png');
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
}

/* formulaire */

.container_form {
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.form_title {
  font-size: 35px;
}

.form_info {
  font-size: 14px;
  font-weight: 600;
}

.account {
  cursor: pointer;
  font-weight: 800;
  text-transform: uppercase;
  color: blue;
  text-decoration: underline;
}

.input_style {
  border-radius: 10px;
  padding: 8px;
  border: 0;
  width: 80%;
  text-align: center;
  font-size: 14px;
}

.password:focus + .passwordHide::after {
  content: "Votre mot de passe doit contenir au moins 8 caractères , 1 majuscule, 1 minuscule et 2 chiffres minimum.";
  visibility: visible;
  font-size: 15px;
  margin: 10px 0;
}

.form_container_size {
  height: 60%;
  display: flex;
  justify-content: center;
}

.form_style {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 60%;
}

.minima {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.form_btn {
  padding: 10px;
  border-radius: 10px;
  border: 0;
  font-weight: 800;  
  text-transform: uppercase;
  cursor: pointer;
  font-size: 15px;
}

.form_btn:hover{
  background-color: rgba(255, 255, 255, 0.40);
  }

</style>
