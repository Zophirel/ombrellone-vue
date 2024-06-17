<template>
    <form>
        <ResponseNotification :messageType="messageType" :message="resultDescription" :isVisible="messageArrived"/>
        <label>Nome</label>
        <input :class="{inputError: nameError != ''}" v-model="name" type="text" name="name" placeholder="Mario">
        <ul class="errorMessage" v-show="nameError != ''">
            <li>{{ nameError }}</li>
        </ul>

        <label>Cognome</label>
        <input :class="{inputError: surnameError != ''}" v-model="surname" type="text" name="surname" placeholder="Rossi">
        <ul class="errorMessage" v-show="surnameError != ''">
            <li>{{ surnameError }}</li>
        </ul>
        
        <label>Telefono</label>
        <input :class="{inputError: telError != ''}" v-model="tel" type="tel" name="tel" placeholder="+39 --- ---- ---">
        <ul class="errorMessage" v-show="telError != ''">
            <li>{{ telError }}</li>
        </ul>
        
        <label>E-mail</label>
        <input :class="{inputError: emailError != ''}" v-model="email" type="text" name="email" placeholder="mario@rossi.it">
        <ul class="errorMessage" v-show="emailError != ''">
            <li>{{ emailError }}</li>
        </ul>
        <label>Passowrd</label>
        <div class="passwordCtn" :class="{inputError: passwordError != ''}">
            <input  v-model="password" :type="isPasswordVisibile ? 'text' : 'password'" id="password" name="password" placeholder="• • • • • •">
            <span @click="togglePasswordVisibility"><img :src="visibilityIcon"></span>
        </div>

        <input type="button" value="Registrati" @click="signup">
        <p id="login" @click="$emit('setState', 'login')">Hai gia un Account?</p>
    </form>
</template>
    
  
<script>
import { UserRepository } from '../../../data/repository/user';
import { useUserStore } from '../../../domain/user/userStore';
import { ref } from 'vue';
import ResponseNotification from './ResponseNotification.vue'

export default {
    name: 'LoginModal',

    setup(){
        const userStore = useUserStore();
        const name = ref('');
        const surname = ref('');
        const email = ref('');
        const password = ref('');
        const tel = ref('');
        return { name, surname, email, password, tel, userStore };
    },

    data(){
        return {
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            visibilityIcon: "/src/assets/auth/visibility_off.svg",
            isPasswordVisibile: false,
            nameError: "",
            surnameError: "",
            emailError: "",
            passwordError: "",
            telError: "",
        }
    },

    components: {
        ResponseNotification
    },

    methods : {

        togglePasswordVisibility(){
            if(this.visibilityIcon === "/src/assets/auth/visibility_off.svg" ){
                this.visibilityIcon = "/src/assets/auth/visibility_on.svg"
                this.isPasswordVisibile = true;
            }else{
                this.visibilityIcon = "/src/assets/auth/visibility_off.svg"
                this.isPasswordVisibile = false;
            }
        },

        toggleMessage(){
            this.hideLoginFieldError();
            this.messageArrived = true;
            
            setTimeout(() => {
                this.messageArrived = false;
                if(this.messageType === "success"){
                    this.$emit("setState", "login");
                }
               
            }, 5000);
        },

        hideLoginFieldError(){
            this.nameError = "";
            this.surnameError = "";
            this.emailError = "";
            this.passwordError = "";
            this.telError = "";

        },
        

        showLoginFieldError( errors ){
            errors.map((error) => {
                if(error.path === "name"){
                    this.nameError = error.msg
                } else if(error.path === "surname"){
                    this.surnameError = error.msg
                } else if(error.path === "email"){
                    this.emailError = error.msg;
                } else if(error.path === "password"){
                    this.passwordError = error.msg;
                } else if(error.path === "tel"){
                    this.telError = error.msg;
                }
            });
        },

              
        async signup(){        
            const userData = {
                name: this.name,
                surname: this.surname,
                email: this.email, 
                password: this.password,
                tel: this.tel
            }
            
            const response = await UserRepository.signup(userData);
            console.log("SIGNUP RESPONSE");
            console.log(response);
           
        
            if(response instanceof Error){
                this.messageType = "error";
            
                if(!response.response.data.errors){
                    this.resultDescription = response.response.data.msg;
                    this.toggleMessage();
                }else{
                    this.showLoginFieldError(response.response.data.errors);
                }

            } else {
                this.hideLoginFieldError();
                this.messageType = "success";
                
                this.resultDescription = response;
                this.toggleMessage();
            }
        },
    }
};
</script>

<style scoped>
@import "../../../authModals.css";
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

</style>