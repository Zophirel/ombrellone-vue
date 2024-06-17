import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ isLogin: false, user: null }),
    
    getters: {
      isUserLogged: (state) => state.isLogin,
      getUser: (state) => state.isLogin === true ? state.user : null
    },

    actions: {
      logInUser(user) {
        this.user = user;
        this.isLogin = true;
      },

      logOutUser() {
        this.user = null;
        this.isLogin = false;
      }
    },
    persist: true,
});