<template>
    <div id="authModalCtn">
        <input
            id="dateInput"
            :class="{ 'warn' : warn.msg !== '' }"
            :disabled="showCalendar" 
            :value="getDate" 
            type="text" 
            @click="openCalendar()" 
            placeholder="GG/MM/YYYY"
        >
        <p id="warnText" v-show="warn.msg != '' ">{{ warn.msg }}</p>
        <Transition name="calendar"> 
            <div class="calendarWrapper">
                <div class="calendar" v-show="showCalendar">
                    <div id="monthInput"> 
                        <button  @click.prevent="getPreviousMonth()">
                            <span id="lbtn"><</span>    
                        </button>
                        <h3> {{ selectedMonthName }} </h3>
                        <button  @click.prevent="getNextMonth()">
                            <span id="rbtn">></span>    
                        </button>
                    </div>
                    <Transition name="numbers" > 
                        <div class="week-grid" v-show="showCalendar">
                            <p class="daysName">Lun</p>
                            <p class="daysName">Mar</p>
                            <p class="daysName">Mer</p>
                            <p class="daysName">Gio</p>
                            <p class="daysName">Ven</p>
                            <p class="daysName">Sab</p>
                            <p class="daysName">Dom</p>
                            <div
                                v-for="day in selectedMonth" 
                                :class="{
                                    daysNumber: true, 
                                    activeDaysNumber: selectedDay === day.date, 
                                    avaliable: day.status === 'avaliable',
                                    almostFull: day.status === 'almostFull',
                                    full: day.status === 'full',
                                    notAvaliable : day.status === 'notAvaliable',
                                    expiredDate : day.status === 'expiredDate'
                                   
                                }" @click="(day.status !== 'notAvaliable' && day.status !== 'expiredDate')  ? handleDayClick(day) : null"> 
                                <p> {{ day.date.getDate() }}</p>
                            </div> 
                        </div>
                    </Transition> 
                </div>
            </div>
        </Transition>
    </div>
</template>
    
  
<script>

    import { usePlaceStore } from '../../../domain/place/placeStore';
    import { PlaceRepository } from '../../../data/repository/place';
    
    export default {
        name: 'Calendar',
        emits: ["setDateForAvaliablePlace", "resetDate", "resetWarn"],
        props: {
            date: Date,
            warn: Object
        },

        setup(){
            const placeStore = usePlaceStore();
            return { placeStore }
        },

        computed: {
            getDate(){
                if(this.date === null && this.selectedDay !== null){
                    return this.selectedDay;
                } else if(this.date !== null && this.selectedDay === null){
                    return this.date.toLocaleDateString();
                } else if(this.date !== null && this.selectedDay !== null){
                    return this.selectedDay;
                } else {
                    return '';
                }
            }
        },

        data(){
            return { 
                showCalendar : false, 
                workingMonths: [],
                selectedMonth: [],
                selectedMonthName: "",
                selectedDay: null,
            }
        },

        async mounted() {
            console.log("calendar mounted");
            if(this.date !== null){
                this.selectedDay = this.date.toLocaleDateString();
            }
            this.initCalendar()
        },

        methods: {
            getNextMonth() {                       
                if(this.workingMonths[0] === this.selectedMonth){
                    this.selectedMonthName = "Luglio";
                    this.selectedMonth = this.workingMonths[1];
                } else if(this.workingMonths[1] === this.selectedMonth){
                    this.selectedMonthName = "Agosto"
                    this.selectedMonth = this.workingMonths[2];
                } else if(this.workingMonths[2] === this.selectedMonth){
                    this.selectedMonthName = "Settembre"
                    this.selectedMonth = this.workingMonths[3];
                } else if(this.workingMonths[3] === this.selectedMonth){
                    this.selectedMonthName = "Giugno";
                    this.selectedMonth = this.workingMonths[0];
                }
            },

            getPreviousMonth() {
                if(this.workingMonths[0] === this.selectedMonth){
                    this.selectedMonthName = "Settembre"
                    this.selectedMonth = this.workingMonths[3];

                } else if(this.workingMonths[1] === this.selectedMonth){
                    this.selectedMonthName = "Giugno"
                    this.selectedMonth = this.workingMonths[0];
                
                } else if(this.workingMonths[2] === this.selectedMonth){
                    this.selectedMonthName = "Luglio"
                    this.selectedMonth = this.workingMonths[1];
                
                } else if(this.workingMonths[3] === this.selectedMonth){
                    this.selectedMonthName = "Agosto";
                    this.selectedMonth = this.workingMonths[2];
                }
            },

            openCalendar(){
                this.$emit("resetDate")
                this.showCalendar = true;
            },

            handleDayClick(dayaData) {

                this.$emit("resetWarn");
                if (this.selectedDay !== dayaData.date) {
              
                    this.selectedDay = dayaData.date.toLocaleDateString();
                   
                    this.$emit("setDateForAvaliablePlace", dayaData.date);
                    
                    setTimeout(() => {
                        this.showCalendar = false;    
                    }, 200);
                    
                } else {
                    this.selectedDay = null;
                }
            },


            setCalendarDayStatus(totalPlaces, i, date){
                const initDate = new Date();
                initDate.setDate(initDate.getDate()-1);
                
                const endDate = new Date(`05-31-${new Date().getFullYear()}`);

                console.log("Set Calendar Days Status")
                let numberOfBookings = 0; 
            
                if(this.placeStore.getBookingPerPlace[i].reservations){
                    numberOfBookings = this.placeStore.getBookingPerPlace[i].reservations.length 
                }

                if(date < initDate && date > endDate){
                    return {
                        date: new Date(date),
                        status: "expiredDate"
                    }
                }
                
                if(date.getMonth() + 1 > 5 && date.getMonth() + 1 < 10 ){
                    if(numberOfBookings <= 0.5 * totalPlaces){
                        return {
                            date: new Date(date),
                            status: "avaliable"
                        }
                    } else if (numberOfBookings > 0.5 * totalPlaces){
                        return {
                            date: new Date(date),
                            status: "almostFull"
                        }
                    } else {
                        return {
                            date: new Date(date),
                            status: "full"
                        }
                    }
                } else {
                    return {
                        date: new Date(date),
                        status: "notAvaliable"
                    }
                }        
            },

            async initCalendar(){

                if(this.placeStore.getBookingRatio.length === 0){
                    this.placeStore.setBookingRatioList((await PlaceRepository.getBookedRatios()).data);
                }

                // Set the start date for the current year's May 27th
                let startDate = new Date(`5-27-${new Date().getFullYear()}`);
                let currentDate = startDate;
                
                // Create arrays for each month
                let june = [], july = [], aug = [], sept = [];
                
                let statusDayCounter = 0;

                
                // Loop through each month and push dates
                for (let i = 0; i < 4; i++) {
                    let currentMonth = [];
                
                    // 35 dates is to get all full calendar pages, without it
                    // the number would be disaligned from the day name 
                    for (let j = 0; j < 35; j++) {
                        currentMonth.push(this.setCalendarDayStatus(150, statusDayCounter, currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                        statusDayCounter++;
                    }
        

                    if (i === 0) june = currentMonth;
                    else if (i === 1) july = currentMonth;
                    else if (i === 2) aug = currentMonth;
                    else if (i === 3) sept = currentMonth;
                }

                // Determine the selected month based on the current date
                let today = new Date();
                let selectedMonth, selectedMonthName;
                if (today.getMonth() + 1 <= 6) {
                    selectedMonth = june;
                    selectedMonthName = "Giugno";
                } else if (today.getMonth() + 1 >= 9) {
                    selectedMonth = sept;
                    selectedMonthName = "Settembre";
                } else if (today.getMonth() + 1 === 7) {
                    selectedMonth = july;
                    selectedMonthName = "Luglio";
                } else {
                    selectedMonth = aug;
                    selectedMonthName = "Agosto";
                }

                this.selectedMonth = selectedMonth;
               
                this.selectedMonthName = selectedMonthName;
                this.workingMonths = [june, july, aug, sept];

                console.log(this.workingMonths);
            }
        }
    };
</script>

<style scoped>
    @import '/src/authModals.css';

    
    .calendarWrapper{
        height: 0;
        width: 0;
        position: relative;
    }

    .calendar{
        width: 300px;
        background-color: white;
        border: 2px solid black;
        padding: 15px;
        border-radius: 10px;
        margin: 0 auto;
        z-index: 1;
        position: relative;
        right: 65px;
    }

    #dateInput:disabled {
        background-color: white;
    }

    #monthInput{
        display: flex;
        align-items: start;
        justify-content: space-between;
        font-size: 20px;
        margin: 10px 0;
        padding: 0 10px;
    }

    #monthInput > button {
        height: 30px;
        width: 30px;
        text-align: center;
        padding: 0;
        border-radius: 100px;
        border: none;
        background-color: #80808057;
        cursor: pointer;
    }

    #monthInput > button:hover {
        border: 2px solid black
    }

    #lbtn, #rbtn{
        position: relative;
        font-size: 20px;
        font-weight: 900;
        bottom: 2px;
    }
    
    #lbtn {
        right: 1px;
    }

    #rbtn{
        left: 1px;
    }
    h3{
        margin: 0;
    }

    #dateInput.warn {
        border: 2px solid red;
    }

    #warnText {
        text-align: start;
        margin: 0;
        position: relative;
        bottom: 6px;
        font-size: 14px;
        color: red;
    }

    .week-grid{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        grid-gap: 4px;
        justify-items: inherit;
    }

    .daysName{
        font-weight: bold;
    }
    
    .avaliable, .almostFull {
        transition: all 0.2s ease-in;
        border-radius: 3px;
    }

    .avaliable {
        background-color: #8bc34a;
    }
    
    .almostFull {
        background-color: #ff9800;
    }
    
    .avaliable:hover, .almostFull:hover {
        cursor: pointer;
    }

    .full {
        background-color: #ff7065;
        border-radius: 3px;
    }

    .expiredDate {
        background-color: lightgray;
        border-radius: 3px;
    }
    
    .activeDaysNumber{
        -webkit-box-shadow:inset 0px 0px 0px 3px #1d1c1c;
        -moz-box-shadow:inset 0px 0px 0px 3px #1d1c1c;
        box-shadow:inset 0px 0px 0px 3px #1d1c1c;
        
        cursor: pointer;
    }


    .calendar-enter-active {
        transition: opacity 0.4s ease-out;
    }

    .calendar-leave-active {
        transition: opacity 0.4s ease-in 0.2s;
    }

    .calendar-leave-to,
    .calendar-enter-from {
        opacity: 0;
    }

    .calendar-enter-to,
    .calendar-leave-from {
        opacity: 1;
    }


    .numbers-enter-active {
        transition: opacity 0.4s ease-out 0.2s;
    }

    .numbers-leave-active {
        transition: opacity 1s ease-in;
    }

    .numbers-leave-to,
    .numbers-enter-from {
        opacity: 0;
    }

    .numbers-enter-to,
    .numbers-leave-from {
        opacity: 1;
    }
</style>