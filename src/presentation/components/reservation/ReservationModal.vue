<template>
    <div id="modal-bg">
        <div id="modal">
            <div id="close" @click="this.$emit('closeModal')">x</div>
            <div class="user-info">
                <label>Nome e Congnome</label>
                <input type="text" class="input" :placeholder="fullName" disabled>
            </div>
         
            <div class="user-info">
                <label>Data</label>
                <Calendar @resetDate="resetDate()" @setDateForAvaliablePlace="setCalendarDate"/>
            </div>

            
            <div class="user-info">
                <label>Posto</label>
                <PlaceList :date="date"/>
                <p>o</p>
                <button @click="goToBooking()"> <img src="/src/assets/map.svg" alt=""> Usa mappa</button>
            </div>
                 
  

            <SeatCounter @addChair="addChair" @removeChair="removeChair"/>
            
            <div class="total">
                <label>Totale</label>
                <label id="value">€{{ (price + (this.chair * 5) - 5 ) }}</label>
            </div>

           <input type="button" value="Conferma" @click="book" >
        </div>
    </div>
</template>
    
  
<script>
    import SeatCounter from '../SeatCounter.vue';    
    import Calendar from './Calendar.vue';
    import PlaceList from './PlaceList.vue';
    import { useRoute, useRouter } from 'vue-router'

 


    export default {
        name: 'ReservationModal',
        emits: ["closeModal"],
        props: {
            "fullName" : String,
        },
        
        data(){
            return {
                price : 10, 
                chair: 1,
                date : null
            }
        },

        setup(){
            const router = useRouter();
            return {router};
        },

        components: {
            SeatCounter,
            Calendar,
            PlaceList
        },
    
        methods : {
            addChair(){
                this.chair++;
            },

            removeChair(){
                this.chair--;
            },

            resetDate(){
                this.date = null;
            },

            setCalendarDate(date) {
                this.date = date;
            },

            book() {
                let clickedPlace = document.getElementsByClassName("ombrellone")[parseInt(this.place-1)];
                clickedPlace.style.backgroundColor = "red";
            },

            async goToBooking()  {   
                console.log(this.date);
                console.log(Math.floor(this.date.getTime() / 1000));
                await this.router.push({
                    name: "Booking",
                    params: { date: `${ this.date.getTime() }`,  }
                });
            }
        }
    };
</script>

<style scoped>
    @import '/src/authModals.css';

    input[type=text]:disabled{
        background-color: gainsboro;
    }

    button {
        border: none;
        height: 30px;
        background-color: #33A8CC;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 auto;
    }


    label{
        display: block;
        font-size: 24px;
    }
    .inptutLabel {
        font-size: 16px;
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
         
    }

    .user-info{
        margin-bottom: 10px;
    }

    .user-info > label {
        font-size: 16px;
    }

    .total{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 900;
        margin-top: 40px;   

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
    }
</style>