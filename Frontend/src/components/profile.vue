<template>
  <div class="glassmorphism container_central fs10">
    <div class=" container_form">
      <span @click="goBack()" class="back_btn font">⬅️ Retour à l'accueil </span> 
      <div class="font fs20">Mon espace perso</div>

      <form @submit.prevent="submit" enctype="multipart/form-data">  
        <div class="container_perso"> 
            <div class="user_info font">
              <input type="text" placeholder="Changer mon pseudonyme" v-if="status == 'modifying'" id="username" :value="user.username" aria-label="zone pour changer votre pseudo">
              <label for='username' class="fs15" v-else>Mon pseudonyme:  {{ user.username }} </label>
              <span v-if="status == 'modifying'"> Adresse email non modifiable </span>
              <span class="fs15" v-else>Mon adresse email:  {{ user.email }} </span>
            </div>
            <div > 
               <label for="image" class="font fs15">Mon avatar :</label>  
              <input type="file"  name="image" ref="image" placeholder="Changer mon avatar" v-if="status == 'modifying'" id="photo" @change="upload" aria-label="zone pour changer votre image de profil">
              <img :src="user.photo" alt="photo de profil de l'utilisateur" v-else/>
            </div>
            <div>
              <textarea v-if="status == 'modifying'" id="bio" placeholder="Changer ma bio..." :value="user.bio" aria-label="zone pour changer votre biographie"></textarea>
              <label class="font fs15" for="bio" v-else>Ma bio : {{ user.bio }}</label>
            </div>
          </div>
          <span class="btn_account_manage">
            <button type="button" class="profile_btn minima font" v-if="status == 'modifying'" @click="modified()" aria-label="zone pour sauvegarder vos changements">Sauvegarder mes informations</button>
            <button type="button" class="profile_btn minima font" @click="modify()" v-else aria-label="zone pour modifier votre compte">Modifier mon compte</button>
            <button type="button" class="profile_btn minima font" @click="deleteUser()" aria-label="zone pour supprimer votre compte">Supprimer mon compte</button>
        </span>
      </form>
        
    </div>   
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'profile', 
  data: function () {
    return {
    username: '',
    bio: '',
    status: '',
    }
  },
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.id === -1) {
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
    upload: function (){
          this.image = this.$refs.image.files[0];
          console.log(this.$refs.image.files[0]);
    },
    modify: function () {
      this.status = 'modifying'
    },    
    modified: function(){
      console.log(this.image);
      const bio = document.getElementById('bio').value
      this.bio = bio

      const username = document.getElementById('username').value
      this.username = username

      const formData = new FormData();
        formData.append("image", this.image)
        formData.append("username", this.username)
        formData.append("bio", this.bio)        
      
      this.$store.dispatch('modify', formData)
        .then(function() {
          window.location = location;
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    deleteUser: function () {
      this.$store.dispatch('delete');
      this.$store.commit('deleteUser');

      if (this.$store.state.user.id == -1) {
        this.$router.push('/');
        return
      }

    },
    goBack: function() {
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
