<template>
    <div id="authModalCtn" class="blurBg">
        <div id="authModal">
            <form>
                <ResponseNotification :messageType="messageType" :message="resultDescription" v-show="messageArrived"/>
                <label>Passowrd</label>
                <div class="passwordCtn" :class="{inputError: passwordError != ''}">
                    <input  v-model="password" :type="isPasswordVisibile ? 'text' : 'password'" placeholder="• • • • • •">
                    <span @click="togglePasswordVisibility"><img :src="visibilityIcon"></span>
                </div>
                <ul class="errorMessage" v-show="passwordError != ''">
                    <li>{{ passwordError }}</li>
                </ul>
                <label>Ripeti passowrd</label>
                <div class="passwordCtn" :class="{inputError: repeatpasswordError != ''}">
                    <input  v-model="repeatPassword" :type="isPasswordVisibile ? 'text' : 'password'" placeholder="• • • • • •">
                    <span @click="togglePasswordVisibility"><img :src="visibilityIcon"></span>
                </div>
                <ul class="errorMessage" v-show="repeatpasswordError != ''">
                    <li>{{ repeatpasswordError }}</li>
                </ul>
                <input type="button" value="Cambia Password" @click="changePassword">
          
            </form>
        </div>
    </div> 
</template>
    
<script>

    import ResponseNotification from './ResponseNotification.vue';
    import { UserRepository } from '../../../data/repository/user';
    import { useRouter } from 'vue-router';
    export default {
        name: 'ResetPassModal',

        components: {
            ResponseNotification
        },

        props: {
            data: String
        },

        data(){
          return {
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            password: "",
            repeatPassword: "",
            passwordError: "", 
            repeatpasswordError: "",
            isPasswordVisibile: false,
            visibilityIcon: "/src/assets/auth/visibility_off.svg"
          }
        },

        mounted(){
            this.isBlurred = true;
        },

        setup(){
            const router = useRouter();
            return { router }
        },

        methods : {
            toggleMessage(goBack){
                this.hideLoginFieldError();
                this.messageArrived = true;
                
                setTimeout(async () => {
                    this.messageArrived = false;
                    if(goBack){
                        await this.router.replace({name: "HomeDefault"})
                    }
                    
                }, 5000);       
            },

            hideLoginFieldError(){
                this.emailError = "";
                this.passwordError = "";
            },

            togglePasswordVisibility(){
                if(this.visibilityIcon === "/src/assets/auth/visibility_off.svg" ){
                    this.visibilityIcon = "/src/assets/auth/visibility_on.svg"
                    this.isPasswordVisibile = true;
                }else{
                    this.visibilityIcon = "/src/assets/auth/visibility_off.svg"
                    this.isPasswordVisibile = false;
                }
            },

            async changePassword(){
                this.passwordError = '';
                if(this.password != this.repeatPassword){
                    this.repeatPasswordErorr = this.passwordError = "Le password non combaciano";
                    return;
                }

                if(this.password.length < 6) {
                    this.passwordError = "La password deve contenere almeno 6 caratteri";
                    return;
                }

                if(this.repeatPassword < 6){
                    this.repeatpasswordError = 'La password deve contenere almeno 6 caratteri';
                    return
                }
                
                const data = {
                    token: this.$route.params.data,
                    password: this.password
                }
                
                let response = await UserRepository.changePassword(data);
                console.log(response);
                
                if(response.error){
                    this.messageType = 'error';
                    this.resultDescription = response.error;
                    this.toggleMessage(true);
                    return;
                }

                this.messageType = 'success';
                this.resultDescription = response.msg;
                this.toggleMessage(true);
                return;
            }
        }
    };
</script>

<style scoped>

@import "/src/authModals.css";

input[type="password"]{
    margin-bottom: 0;
    border: none;
    padding-right: 0;
}

input[type="password"]:focus-visible{
    outline: none;
}

.passwordCtn{
    display: flex;
    flex-direction: row;
    border-radius: 5px;
}

.passwordCtn > span{
    height: 24px;
    width: 24px;
    position: relative;
    top: 3px;
    right: 3px;
    cursor: pointer;
}

.passwordCtn > input[type="password"]{
    margin-bottom: 0;
    border: none;
    padding-right: 0;
}

.passwordCtn > input[type="text"]{
    margin-bottom: 0;
    border: none;
    padding-right: 0;
    outline: none;
}

  #authModal{
    background-color: white;  
    border-radius: 5px;
    max-width: 80vw;
    align-self: center;
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