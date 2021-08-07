<template>
  <div class="glassmorphism container_central fs10">
    <div class=" container_form">
      <span @click="goBack()" class="back_btn">⬅️ Retour à l'accueil </span> 
      <div class="font fs20"> Profil de l'utilisateur </div>

        <div class="container_perso"> 
            <div class="user_info font">
              <span for='username' class="fs15" >Son pseudonyme: {{ user.username }}</span>
              <span class="fs15" >Son adresse email: {{ user.email }}  </span>
            </div>
            <div > 
               <span for="photo" class="font fs15">son avatar :</span>  
              <img :src="user.photo"/>
            </div>
            <div>
              <span class="font fs15" for="bio" >Sa bio : {{ user.bio }}</span>
            </div>
          </div>
        
    </div>   
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'profile', 
  data: function(){
      return {
          user: '',
      }
  },
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.id === -1) {
      this.$router.push('/');
      return;
    }

    let getId = localStorage.getItem('userId')
    let id = JSON.parse(getId)

    console.log(id);
    axios.get(`http://localhost:3000/api/groupomania/user/${id}`)  
    .then((response)=> {
        console.log(response);
        this.user = response.data;
    })
    .catch((err)=> console.log(err))
  }  
  ,methods: {    
    goBack: function() {
    localStorage.removeItem('userId');
    this.$router.push('/home'); 
    }     
  }
}
</script>

<style scoped>

.fs15 {
    font-size: 14px;
}

input {
  padding: 5px;
  margin: 5px;
}

div img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: fill;
}

.fs20{
  font-size: 20px;
}

.back_btn {
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 15px;
}

.container_central {
  height: 50vh;
  justify-content: center;  
}

.container_form {
  height: 90%;
}

.container_perso {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;
  height: 80%;
}

.user_info {
  display: flex;
  justify-content: space-around;
  width: 50%;
  font-size: 13px;
  margin: 10px 0;
}

</style>
