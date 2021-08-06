<template>
<div class="inner">
  <div v-if="posts.length == 0" class="font post_none"> Pas de publications </div>
  
  <div  v-else>
      <div class="container_post" >
            <div class="post_box" v-for="post in posts" v-bind:key="post">

                <div class="container_info_post">
                    <button v-if="user.isAdmin == 1" class="delete_post_admin font" @click="deletePost()" :data-id="post.id" id="adminDelete">X</button>
                    <button v-if="user.id === post.userId" class="delete_post_admin font" @click="deletePost()" :data-id="post.id" id="adminDelete">X</button>
                    <h6 class="font"> Publié le : {{post.createdAt}} </h6>
                    <h5 class="font">Auteur: {{ post.username }}</h5>
                </div>

                  <div class="container_content_post">
                      <h4 class="title_post font"> {{ post.title }} </h4>
                      <img :src="post.image" class="image">
                      <div class="content_post font"> {{ post.content }} </div>
                  </div>

                <div class="commented_bg">
                  <div class="comment_box font" v-if="comms.length == 0"> Il n'y a pas encore de commentaires...</div>
                  <div class="commentElse" v-else>
                        <div class="comments_container" v-for="comm in comms" v-bind:key="comm" >
                          <button v-if="user.isAdmin == 1" class="delete_post_admin font"  @click="deleteComment()" id="deleteComment" :data-CI="comm.id">X</button>
                          <button v-if="user.id === comm.userId" class="delete_post_admin font" @click="deleteComment()" id="deleteComment" :data-CI="comm.id">X</button>       
                          <span class="font author_comm"> Auteur: {{ comm.username }}</span>                        
                          <div class="comment_box font" > {{ comm.content }}</div>   
                        </div>
           
                      </div>
                </div>                    

                  <span class="comment_send">
                    <form @submit.prevent="submit" enctype="multipart/form-data" class="commentPost">
                    <textarea name="comment" id="comment" cols="60" rows="2" class="font text_comment" placeholder="Laisser mon commentaire..." :data-comment="user.id" :data-AI="post.id"></textarea>
                    <button type="button" class="font" @click="submitComment()">Envoyer</button>
                    </form>
                  </span>

            </div>
        </div>
  </div>
</div>
  

</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
    name: 'Articles',
    data: function() {
        return {
            date:'',
            userId: '',
            articlesId: '',  
            content : '',
            posts: [],  
            comms: [],      
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

      let dateSort

      axios.get('http://localhost:3000/api/groupomania/post')
      .then(response=> {
        this.posts = response.data;
         response.data.map((date) => {
         dateSort = date.createdAt;          
         console.log(dateSort);
        });        
      })
      .catch((err) => console.log(err))

      axios.get('http://localhost:3000/api/groupomania/comment')
      .then(response => {
        this.comms = response.data
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
  methods: {
    submitComment() {

      const getComment = document.getElementById('comment') 
      this.articlesId = getComment.getAttribute('data-AI')
      this.userId = getComment.getAttribute('data-comment')
      this.content = getComment.value;

      const formData = new FormData();
      formData.append("content", this.content)
      formData.append("userId", this.userId)
      formData.append("articlesId", this.articlesId)

      this.$store.dispatch('createComment', formData)
      this.$store.commit('comments');
      window.location = location;
    },
    deletePost() { 
    const id = document.getElementById('adminDelete')
    const idDelete = id.getAttribute('data-id');

      axios.delete(`http://localhost:3000/api/groupomania/post/${idDelete}`)
        .then(()=> {
          window.location = location;
        })
        .catch((error)=> console.log(error))

        const Commentid = document.getElementById('comment');
        const CommentDelete = Commentid.getAttribute('data-CI');

          axios.delete(`http://localhost:3000/api/groupomania/comment/${CommentDelete}`)
            .then(()=> {
              window.location = location;
            })
            .catch((error)=> console.log(error))
    },
    deleteComment() {

    const id = document.getElementById('deleteComment');
    const idDelete = id.getAttribute('data-CI');

      axios.delete(`http://localhost:3000/api/groupomania/comment/${idDelete}`)
        .then(()=> {
          window.location = location;
        })
        .catch((error)=> console.log(error))
    }},
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

.container_post::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
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
}

.post_box::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
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

.image {
  max-height: 200px;
  max-width: 200px;
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
  height: 7vh;
}

.commented_bg {
  width: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: 10vh;
  position: relative;
  background-color: hsl(57, 11%, 62%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4vh;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
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

.comments_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  padding: 2px 0;
}

.comment_box {
  width: 80%;
  background-color: honeydew;
  border-radius: 5px;
  padding: 8px 0;
}

.comment_send {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.author_comm {
  margin-bottom: 5px;
  font-size: 14px;
  text-transform: uppercase;
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