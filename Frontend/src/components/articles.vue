<template>
<div class="inner">
  <div v-if="posts.length == 0" class="font post_none"> Pas de publications </div>
  
  <div v-else>
      <div class="container_post" >
            <div class="post_box" v-for="post in posts" v-bind:key="post" onload="getDate()">

                <div class="container_info_post">
                    <button v-if="user.isAdmin == 1" class="delete_post_admin font" @click="deletePost" :data-id="post.id" id="adminDelete">X</button>
                    <button v-if="user.id === post.userId" class="delete_post_admin font" @click="deletePost" :data-id="post.id" id="adminDelete">X</button>
                    <img src="@/assets/icon-left-font-monochrome-white.png" alt="" class="logo_small_post">
                    <h2 class="font postdate"> Publié le : {{ post.date }} </h2>
                    <div class="userInfosPost">            
                      <img :src="post.photoUser" alt="Photo de profil de l'utilisateur" class="postUserPhoto">
                      <h3 class="font postUserName">{{ post.username }}</h3>
                    </div>
        
                </div>

                  <div class="container_content_post">
                      <h4 class="title_post font"> {{ post.title }} </h4>
                      <img :src="post.image" class="image" alt="Image de la publication">
                      <div class="content_post font"> {{ post.content }} </div>
                  </div>

                <div class="commented_bg">
                  <div class="comment_box font no_comm" v-if=" comms.length == 0"> Il n'y a pas encore de commentaires...</div>
                  <div class="commentElse" v-else>
                        <div class="comments_container" v-for="comm in comms" v-bind:key="comm.articlesId">
                          <button v-if="user.isAdmin == 1" class="delete_post_admin font"  @click="deleteComment" id="deleteComment" :data-CI="comm.id">X</button>
                          <button v-if="user.id === comm.userId" class="delete_post_admin font" @click="deleteComment" id="deleteComment" :data-CI="comm.id">X</button>       
                          <div class="font comment_infos"><span><img :src="comm.photoUser" alt="photo de profil de l'utilisateur" class="postUserPhoto"><span class="author_comm">{{ comm.username }}</span></span><span class="author_comm">Publié le : {{ comm.date }}</span></div>                        
                          <div class="comment_box font" > {{ comm.content }}</div>   
                        </div>
           
                      </div>
                </div>                    

                  <span class="comment_send">
                    <form @submit.prevent="submit" enctype="multipart/form-data" class="commentPost">
                    <img :src="user.photo" alt="photo de l'utilisateur" class="photoUserComment">
                    <textarea name="comment" id="comment-2" cols="60" rows="2" class="font text_comment getCommentValue" placeholder="Laisser mon commentaire..." v-model="v$.comment.$model" aria-label="Zone pour ecrire un commentaire" aria-labelledby="comment-2"></textarea>
                    <div v-if="!v$.comment.$required && formStatus == 'error'">Ca ne peut pas être vide !</div>
                    <button type="button" id="btncommentsend" class="font getComment" :data-comment="user.id" :data-AI="post.id" :data-username="user.username" :data-photo="user.photo" @click="submitComment" aria-label="Bouton pour envoyer un commentaire" aria-labelledby="btncommentsend">Envoyer</button>
                    </form>
                  </span>

            </div>
        </div>
  </div>
</div>
  

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';
import axios from "axios";
import { mapState } from 'vuex';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
    name: 'Articles',
    data: function() {
        return {
            postId: '',
            userId: '',
            articlesId: '',  
            content : '',
            posts: [],  
            comms: [],
            comment: '',      
            isAdmin: '',  
            formStatus: null,
        }
    },
    mounted : function () {
    if (this.$store.state.user.id === -1) {
      this.$router.push('/');
      return;
    }
      this.$store.dispatch('getUserInfos');

      axios.get('http://localhost:3000/api/groupomania/post')
      .then(response=> {
        this.posts = response.data;
      })
      .catch((err) => console.log(err))

      axios.get('http://localhost:3000/api/groupomania/comment')
      .then(response => {
          this.comms = response.data
          
          let articlesIds = response.data;
          for (let articlesId of articlesIds) {
            this.postId = articlesId;
            console.log(articlesId);
          }
      })
      .catch((err) => console.log(err))
    },
    computed: {
      ...mapState({
        user: 'userInfos',
        articles: 'articles',
        comments: 'comments',
      })
    },  
    validations: {    
        comment: { 
            required, 
        }
    },
  methods: {
    submitComment: function (event) {  

                let elemente
                document.querySelectorAll(".getCommentValue").forEach((element) => {
                      if  (element.value === '' || null) {
                        return
                      } 
                      else {
                        elemente = element.value
                      }
                })  
                
                this.v$.$touch();
            if (this.v$.$invalid) {
                this.formStatus = 'error';
            } else {
                this.content = elemente
                this.articlesId = event.target.getAttribute('data-AI')
                this.userId = event.target.getAttribute('data-comment')
                const username = event.target.getAttribute('data-username')
                const photoUser = event.target.getAttribute('data-photo')

                const date = new Date();
                const options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
                const newDate = date.toLocaleDateString("fr-FR", options)

                const formData = new FormData();
                formData.append("content", this.content)
                formData.append("userId", this.userId)
                formData.append("articlesId", this.articlesId)
                formData.append("username", username)
                formData.append("date", newDate)
                formData.append("photoUser", photoUser)

                this.$store.dispatch('createComment', formData)
                this.$store.commit('comments');
                window.location = location;  
              }   
    },
    deletePost: function(event) { 
    const idDelete = event.target.getAttribute('data-id');

      axios.delete(`http://localhost:3000/api/groupomania/post/${idDelete}`)
        .then(()=> { window.location = location })
        .catch((error)=> console.log(error))

        const CommentDelete = event.target.getAttribute('data-CI');

        axios.delete(`http://localhost:3000/api/groupomania/comment/${CommentDelete}`)
            .then(()=> {window.location = location})
            .catch((error)=> console.log(error))
    },
    deleteComment: function(event) {
    const idDelete = event.target.getAttribute('data-CI');

      axios.delete(`http://localhost:3000/api/groupomania/comment/${idDelete}`)
        .then(()=> {
          window.location = location;
        })
        .catch((error)=> console.log(error))
    }}
}

</script>

<style>

.post_none {
  position: fixed;
  bottom: 25%;
  left: 40%;
  font-size: 20px;
}

.inner {
 position: relative;
}

.userInfosPost{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;
}

.container_post {
  position: absolute;
  top: 25vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: auto;
  overflow-y: scroll;
}

.postUserPhoto{
  height: 30px;
  width: 30px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 2px solid white;
}

.logo_small_post {
  height: 120px;
  width: 120px;
}

.container_post::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.postdate {
  font-size: 12px;
}

.postUserName {
    font-size: 12px;
}

.post_box {
  width: 90%;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-color: honeydew;
  margin: 15px 0;
  border-radius: 5px;
  overflow: hidden;
}

.post_box::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.container_info_post {
  background-color: #949aa2;
  position: relative;
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

}

.title_post {
  padding: 10px 0;
  font-size: 15px;
}

.image {
  max-height: 400px;
  max-width: 400px;
}

.delete_post_admin{
  background-color: rgba(255, 0, 0, 0.65);
  padding: 3px;
  border-radius: 5px;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 8px;
  cursor: pointer;
}

.text_comment{
  padding-left: 5px;
}

.delete_post_admin:hover:after{
  content: 'Supprimer !';
  width: 100px;
  height: 25px;
  font-size: 12px;
  color: black;
  background-color: white;
  position: absolute;
  top: 0px;
  right: 15px;
  border-radius: 10px;
  padding: 5px;
}

.content_post {
  height: fit-content;
  font-size: 16px;
  padding: 5px 0 15px 0;
}

.commented_bg {
  width: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: 12vh;
  min-height: 5.2vh;
  position: relative;
  background-color: #737c8c;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
}

.comment_infos {
  padding: 8px 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
}

.comment_infos span {
  display: flex;
  align-items: center;
}

.commented_bg::-webkit-scrollbar {
  width: 1em;
}

.commented_bg::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.commented_bg::-webkit-scrollbar-thumb {
  background-color: rgb(255, 255, 255);
  outline: 1px solid slategrey;
}

.commentElse {
  width: 100%;
}

.photoUserComment {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid white;
}

.comments_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding: 2px 0 10px 0;
}

.comment_box {
  width: 80%;
  background-color: honeydew;
  border-radius: 5px;
  padding: 8px 0;
}

.no_comm {
  margin: 5px 0 0 0;
}

.comment_send {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.author_comm {
  margin: 0 0 5px 5px;
  font-size: 15px;
}

.commentPost {
  background-color: #949aa2;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  padding: 5px 0;
}

.commentPost button {
  padding: 4px;
}

span form button {
  cursor: pointer;

}
span form button:hover {
  box-shadow: inset 0px -1px 6px 0px rgba(0, 0, 0, 0.5);
}



</style>