

<template>
    <div id="authModalCtn" :class="{ blurBg: isBlurred, notBlurBg: !isBlurred } ">
        <div id="authModal">
          <LoginModal v-if="isLoginState" @setState = "setState"/>
          <SignupModal v-if="isSignUpState" @setState = "setState"/>          
          <LostPassModal v-if="isLostPasswordState" @setState = "setState"/>
        </div>
    </div> 
</template>
    
<script>
    import LoginModal from './LoginModal.vue'
    import SignupModal from './SignupModal.vue'
    import LostPassModal from './LostPassModal.vue'

    export default {
        name: 'AuthModal',
        emits: ['setState'],
      
        data(){
          return {
            isLoginState: true,
            isSignUpState: false,
            isLostPasswordState: false,
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            isBlurred: false
          }
        },

        mounted(){
          setTimeout(() => {
            this.isBlurred = true;
          }, 1);  
        },

        components: {
          LoginModal,
          SignupModal,
          LostPassModal
        },

        methods : {            
          setState(state){
            if(state === "login"){
              this.loginState();
            } else if(state === "signUp"){
              this.signUpState();
            } else if(state === "lostPass"){
              this.lostPassState();
            }
          },

          toggleMessage(){
            this.messageArrived = true;
            setTimeout(() => {
              this.messageArrived = false;
            }, 3000);
          },

          lostPassState(){
            this.isLoginState = false;
            this.isSignUpState = false;
            this.isLostPasswordState = true;
          },

          signUpState(){
            this.isLoginState = false;
            this.isSignUpState = true;
            this.isLostPasswordState = false;
          },

          loginState(){
            this.isLoginState = true;
            this.isSignUpState = false;
            this.isLostPasswordState = false;
          },
        }
    };
</script>

<style scoped>

  #authModal{
    background-color: white;  
    border-radius: 5px;
    max-width: 80vw;
    align-self: center;
  }
  
  label {
    font-size: 28px;
    text-align: start;
    margin: 1.4vh 0;
  }

  input[type=button]{
    border: none;
    height: 50px;
    margin-top: 40px;
    background-color: #33A8CC;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  input[type=text], 
  input[type=password],
  input[type=tel]{
    border: 2px solid #655a5a;
    height: 40px;
    min-width: 250px;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 0 15px;
    min-width: 200px;
  }

  #authModalCtn{
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.363);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    height: 100vh;
    transition: backdrop-filter 0.3s ease-in;

  }

  .notBlurBg {
    backdrop-filter: blur(0px);
  }

  .blurBg{
    backdrop-filter: blur(5px);
  } 

  @media screen and (max-height: 700px ) {
    #authModalCtn {
        align-items: start;
    }
  }
  
</style>