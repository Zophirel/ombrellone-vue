<template>
    <form>
        <ResponseNotification :messageType="messageType" :message="resultDescription" v-show="messageArrived"/>
        <label>E-mail</label>
        <input v-model="email" type="text" name="email" placeholder="mario@rossi.it">
        <ul class="errorMessage" v-show="emailError != ''">
            <li>{{ emailError }}</li>
        </ul>
        <input type="button" value="Cambia Password" @click="lostPass">
        <p id="signUp" @click="$emit('setState', 'signUp')">Non hai un Account?</p>
    </form>
</template>
    
  
<script>
import { ref } from 'vue';
import ResponseNotification from './ResponseNotification.vue'

export default {
    name: 'LostPassModal',

    setup(){
        const email = ref('');
        return { email };
    },

    data(){
        return {
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            emailError: "",
        }
    },

    components: {
        ResponseNotification
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
    }
};
</script>

<style scoped>
@import "../../../authModals.css";
</style>