<template>
    <div id="modal-bg">
        <div id="modal" v-show="!operationCompleated">
            <div id="close" @click="closeModal">x</div>
            <div class="user-info">
                <label>Nome e Congnome</label>
                <input type="text" class="input" :placeholder="fullName" disabled>
            </div>
         
            <div class="user-info">
                <label>Data</label>
                <Calendar 
                    :date="dateProp" 
                    @setDateForAvaliablePlace="setCalendarDate"
                    @resetDate="resetDate()"
                    :warn="calendarWarn" 
                    @resetWarn="calendarWarn.msg = ''"   
                />
            </div>

            <div class="user-info">
                <label>Posto</label>
                <PlaceList 
                    :warn="placeListWarn"
                    :placeProp="placeProp" 
                    :date="dateProp ?? this.date"
                    @setPlace="setPlace"
                />
                <p>o</p>
                <button @click="goToBooking()"> <img src="/src/assets/map.svg" alt="">Usa mappa</button>
            </div>
                 
            <SeatCounter @addChair="addChair" @removeChair="removeChair"/>
            
            <div class="total">
                <label>Totale</label>
                <label id="value">€{{ (price + (this.chair * 5) - 5 ) }}</label>
            </div>

           <input type="button" value="Conferma" @click="book()" >
        </div>
        <div id="success-modal" v-show="operationCompleated">
            <h1 id="success">Prenotazione effettuata</h1>
            <p id="success-p" >La prenotazione è stata confermata, per ogni necessità è recuperabile nella sezione <i>"Prenotaizoni effettuate"</i> del menù principale</p>
            <button @click="closeModal">OK</button>
        </div>
    </div>
</template>
    
  
<script>
    import SeatCounter from '../SeatCounter.vue';    
    import Calendar from './Calendar.vue';
    import PlaceList from './PlaceList.vue';
    import { useUserStore } from '../../../domain/user/userStore';
    import { useRouter } from 'vue-router';
    import { PlaceRepository } from '../../../data/repository/place';
    import { AxiosError } from 'axios';

    export default {
        name: 'ReservationModal',
        emits: ["toggleReservationModal"],
        props: {
            placeProp: String,
            dateProp : Date,
        },
        
        data(){
            return {
                price : 10, 
                chair: 1,
                date : null,
                place : null,
                fullName: "",
                calendarWarn: { msg: "" },
                placeListWarn: { msg: "" }, 
                operationCompleated: false
            }
        },

        setup(){
            const router = useRouter();
            const userStore = useUserStore();
            return { router, userStore };
        },

        mounted(){
            if(this.dateProp && this.dateProp.toString() !== "Invalid Date"){
                this.date = this.dateProp;
                
                if(this.placeProp){
                    this.place = this.placeProp;
                }
            }
            this.fullName = `${this.userStore.getUser.name} ${this.userStore.getUser.surname}`;
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
                this.calendarWarn = { msg: "" };
            },

            setCalendarDate(date) {
                this.date = date;
                this.calendarWarn = { msg: "" };
            },

            setPlace(place) {
                this.place = place;
                this.placeListWarn = { msg: "" };
            }, 

            async closeModal(){       
                this.$emit("toggleReservationModal");
                this.router.replace({name: "LoggedInDefault"});  
            },

            async book() {
                if(this.place === undefined){
                    this.placeListWarn = { msg: "Selziona un posto" };
                }
                
                if(this.date === null){
                    this.calendarWarn = { msg: "Seleziona una data" };
                } 

                if(this.placeListWarn.msg !== '' || this.calendarWarn.msg !== ''){
                    return;
                }

                let operation = await PlaceRepository.makeReservarions(this.date, this.place, this.chair);

                if(operation instanceof AxiosError){
                    console.log("axios error");
                    return;
                } else {
                    this.operationCompleated = true;
                    return;
                }
            },

            async goToBooking()  {   
                
                if(this.dateProp && this.dateProp.toString() === "Invalid Date"){
                    if(this.date === null){
                        this.calendarWarn = { msg: "Seleziona una data" };
                        return;
                    }
                }
                
                if(this.date !== null) {
                    console.log("PUSH WITH DATE")

                    await this.router.push({
                        name: "Booking",
                        params: { date: `${this.date.getTime()}` }
                    });
                } else {

                    console.log("PUSH WITH DATEPROP")
                    await this.router.push({
                        name: "Booking",
                        params: { date: `${this.dateProp.getTime()}` }
                    });
                }
            }
        }
    };
</script>

<style scoped>
    @import '/src/authModals.css';

    input[type=text]:disabled{
        background-color: gainsboro;
    }

    #success {
        font-size: 26px;
        margin: 0;
    }

    #success-p{
        min-width: 300px;
    }

    #success-modal{
        background-color: white;
        z-index: 3;
        padding: 30px 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        margin: 0 30vw;
        min-width: 300px;
    }

    #success-modal > button {
        width: 275px;
        margin-top: 10px;
    }

    button {
        border: none;
        height: 30px;
        background-color: #FDD85D;
        border-radius: 5px;
        color: #272525;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 auto;
        font-family: 'Roboto';
        font-weight: 500;
        padding: 10px;
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
        cursor: pointer;
    }
</style>