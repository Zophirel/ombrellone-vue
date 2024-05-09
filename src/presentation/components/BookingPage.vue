<template>

  <div id="bookingPage">    
    <aside :class="{openCalendar: this.isCalendarOpen, closeCalendar: this.closeCalendarClick}" id="sea" > 
      <p :class="{hideText: isCalendarOpen}">Mare</p> 
      <Calendar v-if="this.isCalendarAnimationFinished" :date="this.localDate.date ?? this.date" @toggleCalendar = "toggleCalendar"/>
    </aside>
    
    <nav v-show="!this.isCalendarOpen">
    
      <div id="calendar" @click="toggleCalendar()">
          <img src="../../assets/calendar.svg">
          <p>{{ localDate.formatted }}</p>
      </div>

      <div id="profile">
          <img src="../../assets/usericon.svg">
      </div>
    
    </nav>
    
  
    <div v-show="!this.isCalendarOpen" class="center-ctn">
      
      <div v-show="!this.isCalendarOpen" class="ombrelloni-ctn">
        <Ombrellone :gridId="n.toString()" v-for="n in this.getGridDimension(this.numberOfUmbrella)[0]" @click="openModal"/>
      </div>

      <div class="middle-line" v-if="this.numberOfUmbrella > 80"></div>
      
      <div class="ombrelloni-ctn" v-if="this.numberOfUmbrella > 80">
        <Ombrellone :gridId="(n + this.getGridDimension(this.numberOfUmbrella)[0]).toString()" v-for="n in this.getGridDimension(this.numberOfUmbrella)[1]" @click="openModal"/>
      </div>

    </div>
</div>
</template>
    
<script>

import Calendar from "./Calendar.vue";
import Ombrellone from "./Ombrellone.vue";
import { useUserStore } from '../../domain/user/userStore';

export default {
  name: "BookingPage",
  emits: ["openModal", "toggleCalendar"],

  props: {
    date: Date,
    numberOfUmbrella: Number
  },

  setup(){
    const userStore = useUserStore();
    return {userStore};
  },

  mounted() {
    console.log("mounted");
    this.setDate();
    this.mounted = true;
    console.log(this.userStore.isUserLogged);
  },

  data() {
    return {
      mounted: false,
      localDate: {formatted: null, date: null},
      isCalendarOpen: false,
      isCalendarAnimationFinished: false,
      closeCalendarClick: false
    };
  },

  components: {
    Ombrellone,
    Calendar
  },

  methods: {
    toggleCalendar(date){

      if(!this.isCalendarOpen){
        this.closeCalendarClick = false;
        this.isCalendarOpen = true;
        this.isCalendarAnimationFinished = false
        setTimeout(() => {
          this.isCalendarAnimationFinished = true;
        }, 600);
      } else {
        console.log("close calendar");
        this.closeCalendarClick = true;
        setTimeout(() => {
          this.isCalendarOpen = false;
          this.setDate(date)
        }, 300);
        
      }
    },

    openModal(event) {
      console.log("parent received click");
      this.$emit("openModal", event.target);
    },

    swapDate(){
      if (this.localDate.formatted !== null) {
        let splittedDate = this.localDate.formatted.split('/');
        let day = splittedDate[0];
        splittedDate[0] = splittedDate[1];
        splittedDate[1] = day;
        return splittedDate.join('/');
      }
    
    },

    setDate(date) {
      if (this.localDate.formatted === null && this.localDate.date === null) {
        this.localDate.formatted = this.date.toLocaleDateString("it-IT");
        this.localDate.date = new Date(Date.parse(this.swapDate()));
      } 
      
      else if( date !== undefined ){
        this.localDate.formatted = date.toLocaleDateString("it-IT");
        this.localDate.date = new Date(Date.parse(this.swapDate()));
      }
    },

    // get the umbrella grids dimension
    getGridDimension(number){
      
      let upRoundedNum = Math.round(number / 2);
      // If upRoundedNum last digit is not 0
      if(upRoundedNum % 10 !== 0){
        // Get the other half
        let downRoundedNum = upRoundedNum;
        let lastDigitUpRoundedNum = upRoundedNum % 10;
        
        // If division is not integer the downRoundNumber will decrease 
        // es: 91 / 2 = 45.5 -> math.round(4.5) = 46 -> 91 = 46 + 45  
        if(!Number.isInteger(number/2)){
            downRoundedNum--;
        }
        
        // Round upRoundedNum number to the closest multiple of 10
        // to decrease the possibility of rigged grid
        if(lastDigitUpRoundedNum > 5){
            upRoundedNum += 10 - lastDigitUpRoundedNum; 
            downRoundedNum -= 10 - lastDigitUpRoundedNum;
        }else{
            upRoundedNum -= lastDigitUpRoundedNum; 
            downRoundedNum += lastDigitUpRoundedNum;
        }
        if(downRoundedNum - upRoundedNum  == 10){
              return [downRoundedNum, upRoundedNum];
        }else{
              return [upRoundedNum, downRoundedNum];
        }
      }else {
          return [upRoundedNum, upRoundedNum];      
      }
    },
  }
};
</script>

<style scoped>


  #bookingPage {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #sea {
    display: flex;
    position: fixed;
    z-index: 1;
    height: 100%;
    background-color: lightblue;
    right: 0;
    width: 10vw;
    justify-content: center;
    align-items: center;
  }   

  #sea > p {
    margin: 0;
    transform: rotate(-90deg);
    font-size: 30px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
  }

  nav {
    grid-area: nav;
    display: flex;
    width: 100vw;
    height: 70px;
    justify-content: center;
    position: relative;
    right: 20px;
    margin-bottom: 20px;
  }

  #calendar{
    display: flex;
    margin: 10px;
    max-width: 250px;
    width: 40vw;
    background-color: aliceblue;
    border-radius: 3px;
    justify-content: space-around;
    align-items: center;

  }

  #calendar > p{
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
  }

  #calendar > img{
    height: 30px;
  }

  #profile{
    margin: 11px;
    border-radius: 100px;
    background-color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 4px;
  }

  #profile > img{
    height: 40px;
  }

  .middle-line { 
    position: relative;
    height: 4vh;
    max-height: 30px;
    width: 100%;
    background-color: gainsboro;
  }

  .ombrelloni-ctn {
    display: grid;
    grid-template-columns: repeat(10, 4vw);
    justify-content: center;
    align-content: center;
    gap: 4vmin;
    margin: 20px 0;
    width: calc(100vw - 50px);
  }

  .center-ctn{
    grid-area: gridCtn;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Calendar animation */
  .openCalendar {
    animation: openCalendar 0.3s ease-in-out 0.2s  forwards;
  }

  .closeCalendar {
    animation: closeCalendar 0.3s ease-out forwards;
  }

  .contained {
    max-width: 100px;
  }

  @keyframes openCalendar {
    0% {
      width: 10vw
    }
    100% {
      width: 100vw;
    }
  }

  @keyframes closeCalendar {
    0% {
      width: 100vw
    }
    100% {
      width: 10vw;
    }
  }

  .hideText {
    animation: hideText 0.2s ease-out forwards;
  }

  .hiddenText {
    display: none;
  }

  @keyframes hideText {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  

</style>