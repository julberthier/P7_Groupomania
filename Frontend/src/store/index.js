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
          date: '',
          title: '',
          image:'',
          content: '',
        },
        comments: {
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
        modifyUser: function(state, userInfos){   
          state.userInfos = userInfos;
        },
        articles: function(state, articles) {
          state.articles = articles;
        },
        deleteArticles: function(state, articles) {
          state.mess = state,
          state.articles = articles;
        },
        comments: function(state, comments) {
          state.comments = comments
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
                        commit('deleteUser', "L'utilisateur a ??t?? supprim??")                        
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
            instance.get('/post')
                .then(function(response){
                  commit('articlesList', response.data)
                })
                .catch(function(){
                  commit('setStatus', 'error_getList')
                })
        },
        createPost: ({commit}, articles) => {
          return new Promise((resolve, reject) => {
            instance.post('/post', articles)
              .then(function(response){
                commit('setStatus', 'creating');
                resolve(response)
              })
              .catch(function(error){
                commit('setStatus', 'error_createArticles')
                reject(error)
              })
          })
        }, createComment: ({commit}, comments) => {
            return new Promise((resolve, reject) => {
              instance.post('/comment', comments)
                .then(function(response){
                  commit('setStatus', 'commenting')
                  resolve(response)
                  .catch(function(err){
                    commit('setStatus', 'error_comment')
                    reject(err)
                })
              }) 
          })
        },
        getComment: ({commit}) => {
            instance.get(`/comment/${store.state.comments.id}`)
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