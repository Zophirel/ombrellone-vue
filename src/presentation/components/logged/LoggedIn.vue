<template> 
    <div class="bg">
        <div id="blur">
            <div class="logout">
                <img src="/src/assets/logout.svg" @click="logout">
            </div>
            <div class="ctn" :show="!isReservationModalOpen && !isBookedModalOpen "> 
                <div class="tile" @click="isReservationModalOpen = true">
                    <img class="icon" src="/src/assets/book.svg"/>
                    <p>Nuova prenotazione</p>
                </div>
                <div class="tile" @click="isBookedModalOpen = true">
                    <img class="icon" src="/src/assets/booked.svg"/>
                    <p>Prenotazioni effettuate</p>
                </div>
                <div class="tile" @click="isAccountModalOpen = true">
                    <img class="icon" src="/src/assets/account.svg"/>
                    <p>Account</p>
                </div>
            </div>
     
            <ReservationModal 
                :placeProp="place" 
                :dateProp="date ? new Date(parseInt(date)) : null" 
                v-if="isReservationModalOpen"
                @closeModal= "toggleReservationModal()"
            />
            <BookedModal @closeModal= "isBookedModalOpen = false" v-if="isBookedModalOpen"/>
            <AccountModal @closeModal= "isAccountModalOpen = false" v-if="isAccountModalOpen" />
        </div>
    </div>
</template>

<script>
    import ReservationModal from '../reservation/ReservationModal.vue';
    import BookedModal from './BookedModal.vue';
    import AccountModal from './AccountModal.vue';
    import { useUserStore } from '../../../domain/user/userStore';
    import { useRouter } from 'vue-router';
    import { UserRepository } from '../../../data/repository/user';
    export default {
        name: 'LoggedIn',
        props: {
            placeProp: String,
            dateProp: String,
            bookedData: Boolean
        }, 

        methods: {
            toggleReservationModal(){
                this.isReservationModalOpen = !this.isReservationModalOpen;
                if(!this.isReservationModalOpen){
                    console.log("deleted value")
                    this.place = null;
                    this.date = null;
                }
            },
            async logout(){     
                this.router.replace({name: "HomeDefault"});
                await UserRepository.logout();
                this.userStore.logOutUser();  
            }
        },

        data(){
            return { 
                isReservationModalOpen: false,
                isBookedModalOpen: false,
                isAccountModalOpen: false,
                date: null,
                place: null,
            }
        },

        setup(){
            const userStore = useUserStore();
            const router = useRouter();
            return {userStore, router};
        }, 

        mounted(){
            console.log("LOGGED IN PROPPLACE")
            console.log(this.placeProp);

            if(this.dateProp !== undefined){
                this.toggleReservationModal();
                this.date = this.dateProp;
                this.place = this.placeProp;
            }

            if(this.bookedData){
                this.isBookedModalOpen = true;
            }
        }, 
        components: {
            ReservationModal,
            BookedModal,
            AccountModal
        }
    }
</script>

<style scoped>
    @import "/src/style.css";
    .bg{
        background-color: aliceblue;
        height: 100%;
        display: flex;
        align-items: center;
        background-image: url('/src/assets/app_bg_r.jpg');
        background-position: center;
        background-size: cover;
    }
    
    #blur{
        height: 100%;
        width: 100%;
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .ctn {
        background-color: whitesmoke;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .tile{
        display: flex;
        gap: 15px;
        flex-direction: row;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        background-color: #FDD85D;
        transition: all 0.4s;
    }

    .tile > p {
        align-self: center;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }

    .tile:hover{
        background-color: #FDC921;
    }  
    
    .logout{
        position: absolute;
        top: 20px;
        right: 25px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #113f4f;
        padding-left: 3px;
        border-radius: 100px;
        cursor: pointer;
    }
</style>
  