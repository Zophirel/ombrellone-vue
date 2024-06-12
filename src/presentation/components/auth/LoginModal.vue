<template>
    <form>
        <ResponseNotification :messageType="messageType" :message="resultDescription" v-show="messageArrived"/>
        <label>E-mail</label>
        <input :class="{inputError: emailError != ''}" v-model="email" type="text" id="email" name="email" placeholder="mario@rossi.it">
        <ul class="errorMessage" v-show="emailError != ''">
            <li>{{ emailError }}</li>
        </ul>
        
        <label>Passowrd</label>
        <div class="passwordCtn">
            <input :class="{inputError: passwordError != ''}" v-model="password" :type="isPasswordVisibile ? 'text' : 'password'" id="password" name="password" placeholder="• • • • • •">
            <span @click="togglePasswordVisibility"><img :src="visibilityIcon"></span>
        </div>
       
        <ul class="errorMessage" v-show="passwordError != ''">
            <li>{{ passwordError }}</li>
        </ul>
    
        <input type="button" @click="login" value= "Accedi"/> 
        <p id="lostPass" @click="$emit('setState', 'lostPass')">Hai dimenticato la password?</p>
        <p id="signUp" @click="$emit('setState', 'signUp')">Non hai un Account?</p>
    </form>
</template>
    
  
<script>
import { UserRepository } from '../../../data/repository/user';
import { useUserStore } from '../../../domain/user/userStore';
import User from "../../../domain/user/user"; 
import { ref } from 'vue';
import ResponseNotification from './ResponseNotification.vue'
import { usePlaceStore } from '../../../domain/place/placeStore';
import { PlaceRepository } from '../../../data/repository/place';
import { AxiosError } from 'axios';
import router from '../../../router';
import { useRouter } from 'vue-router';


export default {
    name: 'LoginModal',

    setup(){
        const userStore = useUserStore();
        const placeStore = usePlaceStore();
        const email = ref('');
        const password = ref('');
        const router = useRouter();
        return { email, password, userStore, placeStore, router };
    },

    data(){
        return {
            messageArrived: false,
            messageType: "",
            resultDescription: "",
            emailError: "",
            passwordError: "",
            visibilityIcon: "/src/assets/auth/visibility_off.svg",
            isPasswordVisibile: false
     
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
                } else if(error.path === "password"){
                    this.passwordError = error.msg;
                }
            })
        },

        async login(){      
            const userData = {
                email: this.email, 
                password: this.password
            }

            let user = await UserRepository.login(userData);
            
            if(user instanceof User){
                this.hideLoginFieldError();
               
                
                this.userStore.isLogin = true;
                user.email = this.email;
                this.userStore.user = user;
                this.placeStore.setBookingRatioList(await PlaceRepository.getBookedRatios());
                this.placeStore.setBookingPerPlaceList(await PlaceRepository.getAllReservationsPerPlace());
                this.placeStore.setUserBooking(await PlaceRepository.getUserBookings());
                
                this.messageType = "success";
                this.resultDescription = "Login effettuato!";
                this.toggleMessage();
                
                await this.router.push({name: "LoggedInDefault"} );
         
            } 
            
            else if(user instanceof AxiosError) {
                this.messageType = "error";
               if(user.response.data){
                    if(!user.response.data.errors){
                        console.log(user.response.data)
                        this.resultDescription = user.response.data.msg;
                        this.toggleMessage();
                    }else{
                        this.showLoginFieldError(user.response.data.errors);
                    }
                }
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