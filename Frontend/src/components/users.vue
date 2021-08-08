<template>
<Nav />

    <div class="glassmorphism container_central fs10">
        
        <span @click="goBack()" class="back_btn font">⬅️ Retour à l'accueil </span>
        <div class="logo_div">    
            <img src="@/assets/icon-left-font-monochrome-white.png" alt="logo du site groupomania" class="logo_central"/>
        </div>
        <div class="container_users">
            <button type="button" @click="updateList()">Mettre à jour la liste</button>
        <div class="form_container_size">
                <li v-for="user in users" v-bind:key="user" class="font fs15">
                    <p>Utilisateur:</p>
                    <span @click="getUser" class="clickable getUser" :data-id="user.id">{{ user.username}}</span>
                    <p>Bio:</p>
                    <span class="userBio">{{user.bio}}</span>
                </li>
        </div>            
        </div>   
    </div>
</template>

<script>
import axios from 'axios'
import Nav from './nav.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Nav,
  },
  data : function ()  {
    return { 
        users: []
    }
  }, 
  computed : {
      ...mapState({
        user: 'userInfos',
        })
  }, 
  methods: {
    user: function () {
        this.$router.push('/profile');
    }, 
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    goBack: function() {
    this.$router.push('/home');
    },
    updateList: function(){
        axios
        .get('http://localhost:3000/api/groupomania/user/')
        .then(response => this.users = response.data)
        .catch((err) => console.log(err))
    }, 
    getUser: function(event) {
            let id = event.target.getAttribute("data-id");
            axios
            .get(`http://localhost:3000/api/groupomania/user/${id}`)
            .then((response) => { 
                console.log(response);
                localStorage.setItem('userId', JSON.stringify(id))
                this.$router.push('/p-user');
            })
            .catch((err) => console.log(err))        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fs15 {
    font-size: 14px;
}

.back_btn {
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 15px;
}

.userBio {
    display: block;
    text-overflow: ellipsis;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
}

.container_users button {
    width: 150px;
    height: 30px;
    padding: 6px;
    cursor: pointer;
}

.container_users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85%;
}

.form_container_size {
    display: flex;
    flex-flow: row wrap;
    width: 80%;
    height: 80%;
    overflow-y: scroll;
    margin-top: 20px;
}

li {
    list-style:none;
    padding: 5px 8px;
}

li p {
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    padding: 4px 10px;
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    color: #d7d7d7;
    transition: color 0.10s ease-in-out;
}

</style>
