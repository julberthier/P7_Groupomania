import { createStore } from 'vuex';
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/groupomania/user'
});

const store = createStore({
    state: {
        status: '',
        user: {
            userId: -1,
            username: '',
            token: ''
        },
    }, 
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function(state, user) {
            state.user = user;
        }
    },
    actions: {
        signUp: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/signup', userInfos)
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
                instance.post('/login', userInfos)
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
        }
    }
});

export default store;