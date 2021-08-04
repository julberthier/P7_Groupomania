import { createStore } from 'vuex';
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/groupomania'
});

let localUser = localStorage.getItem('user');
if (!localUser) {
  localUser = {
    id: -1,
    token: '',
  }; 
} else {
  try {
    localUser = JSON.parse(localUser);
    instance.defaults.headers.common['Authorization'] = localUser.token;
  } 
  catch (error) {
    localUser = {
      id: -1,
      username: '',
      token: '',
    };
  }
}

const store = createStore({
    state: {
        status: '',
        user: localUser,
        userInfos: {
            id: '',
            username: '',
            email: '',
            photo: '',
            bio: '',
        },
        mess: '',
        articles: {
          id: '',
          username: '',
          date: '',
          title: '',
          attachment:'',
          content: '',
          likes: [],
          dislikes: [],
        },
        comments: {
        username: '',
        content: '',
        id: '',
        }
    }, 
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function(state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        }, 
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
              id: -1,
              token: '',
            }
        localStorage.removeItem('user');
        },
        deleteUser: function(state){
        state.mess = state,
        state.user = {
          id: -1,
          token: '',
        }
        localStorage.removeItem('user');
        },
        modifyUser: function(state, user, userInfos){
          instance.defaults.headers.common['Authorization'] = user.token;
          state.user = user;
          state.userInfos = userInfos;
        },
        articlesList: function(state, articles) {
          state.articles = articles;
        },
        createArticles: function(state, articles, user) {
          state.user = user;
          localStorage.setItem('articles', JSON.stringify(articles));
          state.articles = articles;
        }
    },
    actions: {
        signUp: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
                commit ('setStatus', 'loading');
                instance.post('/user/signup', userInfos)
                  .then(function (response) {
                    commit('setStatus', '');
                    resolve(response);                  
                  })
                  .catch(function (error) {
                    commit('setStatus', 'error_signup');
                    reject(error);
                  });
            })           
        },
        login: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
              commit ('setStatus', 'loading');
              instance.post('/user/login', userInfos)
                  .then(function (response) {
                    commit('setStatus', '');
                    commit('logUser', response.data)
                    resolve(response);                  
                  })
                  .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error);
                  });
            })           
        },
        modify: ({commit}, modifyUser) => {
          return new Promise((resolve, reject) => {
                commit ('setStatus', 'modifying');
                instance.put(`/user/${store.state.user.id}`, modifyUser)
                    .then (function (response) {
                        commit('setStatus', '');
                        commit('modifyUser', response.data)
                        resolve(response);                  
                    })
                    .catch (function (error) {
                        commit('setStatus', 'error_modify');
                        reject(error);
                    })   
                  })          
        },
        delete: ({commit}) => {       
          commit('setStatus', 'deleting');     
            instance.delete(`user/${store.state.user.id}`)
                    .then (function () {
                        commit('setStatus', 'deleting');
                        commit('deleteUser', "L'utilisateur a été supprimé")                        
                    })
                    .catch (function () {
                        commit('setStatus', 'error_delete');                        
                    })              
        },
        getUserInfos: ({commit}) => {
            instance.get(`/user/${store.state.user.id}`)
                  .then(function (response) {
                    commit('userInfos', response.data)                    
                  })
                  .catch(function () {
                    commit('setStatus', 'error_user');
                  });
        },
        getAllPosts: ({commit}) => {
            instance.get('/post/')
                .then(function(response){
                  commit('articlesList', response.data)
                })
                .catch(function(){
                  commit('setStatus', 'error_getList')
                })
        },
        createPost: ({commit}, createArticles) => {
            instance.post('/post', createArticles)
              .then(function(response){
                commit('setStatus', 'creating');
                commit('articles', response.data)
              })
              .catch(function(){
                commit('setStatus', 'error_createArticles')
              })
        },
        deletePost: ({commit}) => {
            instance.delete(`/post/${store.state.articles.id}`)
              .then(function(){
                commit('setStatus', 'deleting');
                commit('articles', 'La publication a été suppriméé')
              })
              .catch(function(){
                commit('setStatus', 'error_delete');               
              })
        },
        getComment: ({commit}) => {
            instance.get('/comment')
              .then(function(response) {
              commit('comments', response.data)
              })
              .catch(function(){  
                commit('setStatus', 'error_comment');         
              })
        },
        postLikes: ({commit}) => {
            instance.post(`/post/${store.state.articles.id}/like`)
              .then(function(response){
                commit('setStatus', 'liking');
                commit('articles', response.data)
              })
              .catch(function(){
                commit('setStatus', 'error_liking');         
              })
        },
        postComment: ({commit}) => {
            instance.post('/comment')
              .then(function() {
                commit()
              })
              .catch(function(){

              })
        },
        deleteComment: ({commit}) => {
            instance.delete(`/comment/${store.state.comments.id}`)
              .then(function(){
                commit()
              }).catch (function(){

              })
        },
        
    }
});

export default store;