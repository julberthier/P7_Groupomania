import { createStore } from 'vuex';
const axios = require("axios");

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/groupomania/user'
});

let LocalUser = localStorage.getItem('user');
console.log(LocalUser);

if (!LocalUser) {
  LocalUser = {
    id: -1,
    token: '',
  }; 
} else {
  try {
    LocalUser = JSON.parse(LocalUser);
    instance.defaults.headers.common['Authorization'] = LocalUser.token;
  } catch (error) {
    LocalUser = {
      id: -1,
      username: '',
      token: '',
    };
  }
}

const store = createStore({
    state: {
        status: '',
        user: LocalUser,
        userInfos: {
            id: '',
            username: '',
            email: '',
            photo: '',
            bio: '',
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
        }
    },
    actions: {
        signUp: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
                commit ('setStatus', 'loading');
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
        },
        modify: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.put('/modify', userInfos)
                    .then (function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data)
                        resolve(response);
                    })
                    .catch (function (error) {
                        commit('setStatus', 'error_modify');
                        reject(error);
                    }) 
            }) 
        },
        delete: ({commit}, userInfos) => {
            return new Promise((resolve, reject) => {
                commit ('setStatus', 'loading');
                instance.put('/delete', userInfos)
                    .then (function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data)
                        resolve(response);
                    })
                    .catch (function (error) {
                        commit('setStatus', 'error_delete');
                        reject(error);
                    }) 
            }) 
        },
        getUserInfos: ({commit}) => {
            instance.get('/user:id')
                  .then(function (response) {
                    commit('userInfos', response.data)
                  })
                  .catch(function () {
                    commit('setStatus', 'error_user');
                  });
        }
    }
});

export default store;