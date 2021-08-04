<template>
  <div v-if="posts.length == 0" class="font post_none"> Pas de publications </div>
  <div class="container_post" v-else>
      <div class="post_box">
          <div class="container_info_post">
              <button v-if="user.isAdmin == 1" class="delete_post_admin font">X</button>
              <h6> Publié le : {{articles.date}} </h6>
              <h5>Auteur: {{ articles.username }}</h5>
          </div>

            <div>
                <h4> {{ articles.title }} </h4>
                <img :src="articles.attachment">
                <div class="content_post"> {{ articles.content }} </div>
            </div>

            <span class="likes_container">
                <span class="likes_box">
                    <button>👍</button>
                    <div>{{articles.likes.length}}</div>
                </span>

                <span class="likes_box">
                    <button>👎</button>
                    <div>{{articles.dislikes.length}}</div>
                </span>          
            </span>

            <div class="commented">
              <button v-if="user.isAdmin == 1" class="delete_post_admin font">X</button>
              <span> Auteur: {{ comments.username }}</span>
              <div class="comment_box">COMMENTAIRES {{ comments.content }}</div>              
            </div>

            <span class="comment_send">
              <form action="" class="commentPost">
              <textarea name="" id="" cols="60" rows="2" placeholder="Laisser mon commentaire..."></textarea>
              <button>Envoyer</button>
              </form>
            </span>

      </div>
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators';
import axios from "axios";
import { mapState } from 'vuex';

export default {
    setup () {
    return { v$: useVuelidate() }
    },
    name: 'Articles',
    data: function() {
        return {  
            posts: [],        
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
    },
    computed: {
      ...mapState({
        user: 'userInfos',
        articles: 'articles',
        comments: 'comments',
      })
    },
     validations: {
    commentaire: { required, maxLength: maxLength(200) },
  },  
  methods: {
    async submitComment() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.formStatus = "ERROR";
      } else {
        this.formStatus = "PENDING";

        this.store.dispatch('postComment')
          .then(function() {
            this.formStatus = "OK";
            this.$router.push("/home");
          })
          .catch(function() { this.formStatus = "ERROR" }
          );
      }
    },
    // Delete post
    async deletePost() {
      this.store.dispatch('deletePost')
        .then(() => { this.$router.push("/home") })
        .catch((error) => console.log(error));
    },
    // Delete comment
    async deleteComment() {
      await axios
      this.store.dispatch('deleteComment')
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) =>
          console.log(error)
        );
    },
    
  },
}

</script>

<style>

.post_none {
  font-size: 20px;
}

.container_post {
  height: 50vh;
  margin-top: 4vh;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
  display: flex;
  justify-content: center;
}

.post_box {
  width: 90%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: honeydew;
  position: relative;
}

.container_info_post {
  background-color: grey;
  position: relative;
  width: 100%;
  height: 4vh;
  padding-top: 1vh;
  display: flex;
  justify-content: space-evenly;
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

.content_post {
  height: 7vh;
  background-color: indigo;
}

.likes_container {
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  width: 50%;
}

.likes_box {
  width: 100%;
}

.likes_box button {
  padding: 6px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
}

.likes_box button:hover {
  background-color: gray;
}

.commented{
  width: 100%;
  overflow: scroll;
  max-height: 8vh;
  position: relative;
  background-color: hsl(57, 11%, 62%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.comment_box {
  background-color: honeydew;
  width: 80%;
  border-radius: 5px;
}

.comment_send {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.commentPost {
  background-color: grey;
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
}

.commentPost button {
  padding: 4px;
}


</style>