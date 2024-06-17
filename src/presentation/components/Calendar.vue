<template>
    <div class="calendar-bg" v-show="this.mounted">
        <Transition name = "header">
            <header v-show="this.mounted"> 
                <button @click="previousMonth"><</button>
                <h1 class="month">{{ this.month ?? computedDate }}</h1>
                <button @click="nextMonth">></button>
            </header>
        </Transition>
        <Transition name = "header">
            <main v-show="this.mounted">   
                <CalendarCell @click="hideCalendar" :day="n" v-for="n in days" />
            </main>
        </Transition>
    </div>
</template>

<script>

import CalendarCell from './CalendarCell.vue';
    export default {
        
        name: "Calendar",
        props: {
            date: Date
        },
        data(){
            return {
                mounted : false,
                month : null,
                days : 0
            };
        },
        mounted(){
            console.log("calendar mounted");
            this.mounted = true;
        },

        components : {
            CalendarCell
        },

        computed: {
            computedDate() {
                let options = {
                    month: "long",
                };

                let dateString = this.date.toLocaleString('it-IT', options);
                dateString = dateString[0].toUpperCase() + dateString.substring(1, dateString.length); 
                
                if(dateString == "Giugno"){
                    this.days = 30;
                }else{
                    this.days = 31;
                }
                
                this.month = dateString;
                return dateString;
            }
        },

        methods : {
            nextMonth() {
                switch (this.month) {
                case 'Giugno':
                    this.month = "Luglio";
                    this.days = 31;
                    break;
                case 'Luglio':
                    this.month = "Agosto";
                    this.days = 31;
                    break;
                }
            },

            previousMonth(){
                switch (this.month) {
                case 'Agosto':
                    this.month = "Luglio";
                    this.days = 31;
                    break;
                case 'Luglio':
                    this.month = "Giugno";
                    this.days = 30;
                    break;
                }
            },

            hideCalendar(event){
                this.mounted = false;
                let monthNumber = this.month == "Giugno" ? 6 : this.month == "Luglio" ? 7 : this.month == "Agosto" ? 8 : null;
                setTimeout(() => {
                    this.$emit("toggleCalendar",  new Date(`${monthNumber}-${event.target.innerHTML}-${new Date().getFullYear()}`));    
                }, 400);
            }
        }
    };
</script>

<style scoped>
    .calendar-bg{
        position: absolute;
        z-index: 1;
        height: 100%;
        background-color: lightblue;
        width: 100vw;
        right: 0;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 20px;
        opacity: 1;
    }

    .header-enter-active {
        transition: opacity 0.4s ease-out;
    }

    .header-leave-active {
        transition: opacity 0.4s ease-in;
    }

    .header-leave-to,
    .header-enter-from {
        opacity: 0;
    }

    .header-enter-to,
    .header-leave-from {
        opacity: 1;
    }


    button{
        height: 50px;
        width: 50px;
        font-size: 30px;
        font-weight: bold;
    }
    
    h1{
    margin: 0;
    min-width: 125px;
}
    main {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(7, minmax(20px, 10vh) );
        grid-template-rows: repeat(5, minmax(20px, 10vh));
        height: 90vh;
        width: 100vw;   
    }
</style>