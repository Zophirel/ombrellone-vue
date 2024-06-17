<template>
    <form>
        <ResponseNotification :messageType="messageType" :message="resultDescription" v-show="messageArrived"/>
        <label>E-mail</label>
        <input v-model="email" type="text" name="email" placeholder="mario@rossi.it">
        <ul class="errorMessage" v-show="emailError != ''">
            <li>{{ emailError }}</li>
        </ul>
        <input type="button" value="Cambia Password" @click="resetPassword">
        <p id="signUp" @click="$emit('setState', 'signUp')">Non hai un Account?</p>
    </form>
</template>
    
  
<script>
import ResponseNotification from './ResponseNotification.vue'
import ResetPassModal from './ResetPassModal.vue';
import { useRouter } from 'vue-router';
import { UserRepository } from '../../../data/repository/user';
export default {
    name: 'LostPassModal',

    setup(){
        const router = useRouter();
        return { router }
    },

    data(){
        return {
            email: '',
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            emailError: "",
            emailNotConfirmedYet: true
        }  
    },

    components: {
        ResponseNotification,
        ResetPassModal
    },

    methods : {
        toggleMessage(){
            this.hideLoginFieldError();
            this.messageArrived = true;
            
            setTimeout(() => {
                this.messageArrived = false;
            }, 3000);
        },

        hideLoginFieldError(){
            this.emailError = "";
            this.passwordError = "";
        },

        showLoginFieldError( errors ){    
            errors.map((error) => {
                if(error.path === "email"){
                    this.emailError = error.msg;
                }
            })
        },

        async resetPassword(){
            let response = await UserRepository.requestChangePassword(this.email);
            console.log(response);
            
            if(response.error){
                this.messageType = 'error';
                this.resultDescription = response.error;
                this.toggleMessage();
                return;
            }

            this.messageType = 'success';
            this.resultDescription = response.msg;
            this.toggleMessage();
            return;
        }
    }
};
</script>

<style scoped>
@import "../../../authModals.css";
</style>