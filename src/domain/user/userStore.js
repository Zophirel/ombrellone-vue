import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ isLogin: false, user: null, payment: null }),
    
    getters: {
      isUserLogged: (state) => state.isLogin,
      getUser: (state) => state.isLogin === true ? state.user : null,
      getPaymentData: (state) => state.payment
    },

    actions: {
      logInUser(user) {
        this.user = user;
        this.isLogin = true;
      },

      logOutUser() {
        this.user = null;
        this.isLogin = false;
      },
      
      clearPaymentData() {
        this.payment = null;
      }
    },
    persist: true,
});