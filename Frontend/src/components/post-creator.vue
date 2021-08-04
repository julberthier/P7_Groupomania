<template>

    <form 
        @submit.prevent="submit" 
        class="post_form" 
    >
      <div>
          <label for="title" class="font">Titre de la publication</label>
          <input type="text" name="title" id="title" placeholder="Titre..." v-model="v$.title.$model"/> 
            <div v-if="!v$.title.$required && formStatus == 'error'" class="form_error">
                Ce champ est obligatoire !
            </div>          
      </div>
      <div>
          <label for="content" class="font">Contenu de la publication</label>
          <textarea rows="5" cols="55" name="content" id="content" placeholder="Contenu..." v-model="v$.content.$model"></textarea>
            <div v-if="!v$.content.$required && formStatus == 'error'" class="form_error">
                Ce champ est obligatoire !
            </div>   
      </div>
      <div>
          <label for="image_link" class="font">Ajouter une image</label>
          <input type="file" ref="image" id="image" @change="upload">
      </div>
      <div>
            <button type="submit" v-if="formStatus == 'pending'" class="font submit_post">En cours...</button>
            <button type="submit" v-else class="font submit_post" @click="submit()">Publier</button>
            <span v-if="!v$.content.$required && formStatus == 'error'" class="form_error">Veuillez remplir tous les champs</span>
      </div>
  </form>
  
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators';
import { mapState } from 'vuex'
// import axios from 'axios'
export default {
      setup () {
    return { v$: useVuelidate() }
  },
    name: 'post-creator',
    data: function () {
        return { 
        id: '',
        title: '',
        content: '', 
        attachment: '',
        formStatus: null,
        }
    },
    computed : {
        ...mapState({
        user: 'userInfos',
        })
    },
    validations: {
        title: { 
            required, 
            minLength: minLength(4) 
        },
        content: { 
            required, 
            minLength: minLength(4) 
        }
    },
    methods: {
        upload: function (){
            this.attachment = this.$refs.image.files[0];
            console.log(this.attachment.name);
        },
        submit: function (){
            console.log(document.getElementById('image').files[0]);

            this.v$.$touch();
            if (this.v$.$invalid) {
                this.formStatus = 'error';
                console.log("erreur");
            } else {
                console.log("Pending");
                this.formStatus = 'pending';      
            }
            
            this.$store.dispatch('createPost', {
                id: this.$store.state.user.id,
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                attachment: document.getElementById('image').files[0].name,
            })
                .then(() => {
                    this.$router.push('/home');
                 })
                .catch((error)=> {
                    console.log(error);
                })    
        },
    }
}
</script>

<style>

label {
font-size: 15px;
}

.post_form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background-color: whitesmoke;
    height: 30vh;
    border-radius: 5px;
    position: absolute;
    top: 45px;
}

.post_form div {
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-evenly;
    width: 50%;
    align-items: center;
}

.post_form input {
    border-radius: 3px;
    border: 1px solid grey;
    padding: 8px;
}

.submit_post {
    padding: 6px;
    width: 100px;
    border-radius: 8px;
    border: 1px solid;
    cursor: pointer;
}

.submit_post:hover {
    background-color: rgba(212, 40, 228, 0.15);
}

</style>