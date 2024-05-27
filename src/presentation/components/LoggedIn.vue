<template> 
    <div class="bg">
        <div id="blur">
            <div class="ctn" :show="!isReservationModalOpen && !isBookedModalOpen "> 
                <div class="tile" @click="toggleReservationModal()">
                    <img class="icon" src="/src/assets/book.svg"/>
                    <p>Nuova prenotazione</p>
                </div>
                <div class="tile" @click="isBookedModalOpen = true">
                    <img class="icon" src="/src/assets/booked.svg"/>
                    <p>Prenotazioni effettuate</p>
                </div>
                <div class="tile">
                    <img class="icon" src="/src/assets/account.svg"/>
                    <p>Account</p>
                </div>
            </div>
            <ReservationModal 
                :placeProp="getBookingData.place" 
                :dateProp="getBookingData.date ? new Date(parseInt(getBookingData.date)) : null" 
                v-if="isReservationModalOpen"
                @toggleReservationModal = "toggleReservationModal"
            />
            <BookedModal @toggleBookedModal="toggleBookedModal" v-if="isBookedModalOpen"/>
        </div>
    </div>
</template>

<script>
    import ReservationModal from './reservation/ReservationModal.vue';
    import BookedModal from './BookedModal.vue';
    import { useUserStore } from '../../domain/user/userStore';

    export default {
        name: 'LoggedIn',
        props: {
            bookingData: String,
            bookedData: Boolean
        },

        computed: {
            getBookingData(){
                return this.bookingData != undefined ? JSON.parse(this.bookingData) : '';
            }
        }, 

        methods: {
            selectOption(n){
                this.optionSelected = n;
            },
            toggleReservationModal(){
                this.isReservationModalOpen = !this.isReservationModalOpen;
            },
            toggleBookedModal(){
                this.isBookedModalOpen = !this.isBookedModalOpen;
            }
        },

        data(){
            return { 
                optionSelected: null,
                date: null,
                isReservationModalOpen: false,
                isBookedModalOpen: false
            }
        },

        setup(){
            const userStore = useUserStore();
            
            return {userStore};
        }, 

        mounted(){
            if(this.getBookingData.date !== undefined){
                this.toggleReservationModal();
            }

            if(this.bookedData){
                this.isBookedModalOpen = true;
            }
        }, 
        components: {
            ReservationModal,
            BookedModal
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
        justify-content: center;
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
</style>
  