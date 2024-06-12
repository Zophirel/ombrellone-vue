<template>
    <div id="modal-bg">
   
        <form id="modal">

          <div id="close" @click="$emit('closeModal')">x</div>
          <ResponseNotification :messageType="messageType" :message="resultDescription" v-show="messageArrived"/>
          <div class="header">
            <h2>Informazioni</h2>
            <h2>Utente</h2>
          </div>
            <div class="user-info">
                <label>Nome</label>
                <input :class="{error: nameWarn != ''}" type="text" class="input" v-model="name" >
                <p id="warnText" v-show="nameWarn != ''"> {{ nameWarn }} </p>
            </div>
            <div class="user-info">
                <label>Cognome</label>
                <input :class="{error: surnameWarn != ''}" type="text" class="input" v-model="surname" >
                <p id="warnText" v-show="surnameWarn != ''"> {{ surnameWarn }} </p>
            </div>
            <div class="user-info">
                <label>Email</label>
                <input :class="{error: emailWarn != ''}" type="text" class="input" v-model="email" >
                <p id="warnText" v-show="emailWarn != ''"> {{ emailWarn }} </p>
            </div>
           <input type="button" value="Modifica dati" @click="editUserInfo()" >
        </form>
    </div>
  </template>
  <script>
  
  import { useUserStore } from "../../domain/user/userStore";
  import ResponseNotification from "./auth/ResponseNotification.vue";
  import { UserRepository } from "../../data/repository/user";
  export default {
    name: "AccountModal",
    emits:  ['closeModal'],
    
    setup(){
      const userStore = useUserStore();
      console.log(userStore.getUser);
      return { userStore }
    },
  
    data(){
      return {
        messageType: "",
        resultDescription: "",
        messageArrived: false,
        name: this.userStore.getUser.name,
        nameWarn: '',
        surname: this.userStore.getUser.surname,
        surnameWarn: '',
        email: this.userStore.getUser.email,
        emailWarn: ''
      }
    },

    components: {
      ResponseNotification
    },

    methods: {
      toggleMessage(){
        this.messageArrived = true;
        setTimeout(() => {
            this.messageArrived = false;
        }, 3000);
      },
      
      async editUserInfo() {
        this.nameWarn = '';
        this.surnameWarn = '';
        this.emailWarn = '';

        if(this.name === ''){
          this.nameWarn = "Il campo nome non può rimanere vuoto";
        }
        
        if(this.surname === ''){
          this.surnameWarn = "Il campo cognome non può rimanere vuoto";
        }

        if(this.email === ''){
          this.emailWarn = "Il campo email non può rimanere vuoto";
        } 

        if(this.nameWarn !== '' || this.surnameWarn !== '' || this.emailWarn !== ''){
          return;
        }
        
        const data = {
          name: this.name,
          surname: this.surname,
          email: this.email
        }

        let result = await UserRepository.editUserInfo(data);        
        this.resultDescription = result.msg ?? result.error;
        this.messageType = result.msg ? "success" : "error";
        this.messageArrived = true;
        
        setTimeout(() => {
          this.messageArrived = false;
          this.resultDescription = '';
          this.messageType = '';
        }, 3000); 
      },
    }
  
  };
  </script>
  
  <style scoped>  
    @import '../../authModals.css';
    .user-info{
      display: flex;
      flex-direction: column;
    }
  
    #close{
      align-items: center;
      height: 30px;
      width: 30px;
      background-color: #33A8CC;
      display: flex;
      justify-content: center;
      position: relative;
      left: 20px;
      bottom: 20px;
      color: white;
      line-height: 8vw;
      text-align: center;
      align-self: end;
      cursor: pointer;
    }
  
    #modal-bg {
      display: flex;
      z-index: 2;
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #000000a1;
      justify-content: center;
      align-items: center;
    }
  
    #modal {
      background-color: white;
      z-index: 3;
      padding: 30px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      max-width: 200px;
    }
  
    h2{
      margin: 0;
      text-align: start;
      font-size: 30px;
    }

    .header {
      margin-bottom: 20px;
    }

    #warnText {
      text-align: start;
      margin: 0;
      position: relative;
      bottom: 6px;
      font-size: 14px;
      color: red;
      width: 203px;
      margin-bottom: 10px;
    }
    
    input[type="text"].error {
      border: 2px solid red ;
    }

  </style>