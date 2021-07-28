<template>
  <div class="glassmorphism container_central fs10">
    <div class=" container_form">
        C'EST BIEN LA PAGE PROFIL
    </div>   
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'profile',
  props: {
    msg: String,    
  }, data : function ()  {
    return { 
    signed: true,
    username: '',
    email: '',
    password: '',
    }
  }, computed : {
    ...mapState(['status'])
  }, methods: {
      signIn: function () {
        this.signed = false;
      },
      loggedIn: function() {
        this.signed = true;
      },
      login: function(){
        const auto =  this;
        this.$store.dispatch('login', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(function() {
          auto.$router.push('profile')
        })
        .catch(function(error) {
          console.log(error);
        })
      },
      signUp: function () {
        this.$store.dispatch('signUp', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          console.log(response);
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
  font-family: 'Patua One', cursive;
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
  font-family: 'Patua One', cursive;
  font-size: 15px;
}

.form_btn:hover{
  background-color: rgba(255, 255, 255, 0.40);
  }

</style>
