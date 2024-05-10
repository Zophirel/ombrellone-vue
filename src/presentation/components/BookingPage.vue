<template>

  <div id="bookingPage">    
    <aside :class="{openCalendar: this.isCalendarOpen, closeCalendar: this.closeCalendarClick}" id="sea" > 
      <p :class="{hideText: isCalendarOpen}">Mare</p> 
    </aside>
    
    <nav>
    <Calendar id="calendar" :date="this.localDate.date" @setDateForAvaliablePlace="setCalendarDate"/>
    
    </nav>
    <div class="center-ctn">
  
      <div class="ombrelloni-ctn">
        <Ombrellone :selectedPlace ="selectedPlace" :date="localDate.date ?? new Date(parseInt(router.params.date))" :cellData="filteredbookingPerPlaceMap.get(getColumnId(n))" :cellId="getColumnId(n)" v-for="n in this.getGridDimension(this.numberOfUmbrella)[0]" @click="handlePlaceClick(getColumnId(n))"/>
      </div>
  
      <div class="middle-line" v-if="this.numberOfUmbrella > 80"></div>
      
      <div class="ombrelloni-ctn" v-if="this.numberOfUmbrella > 80">
        <Ombrellone :date="localDate.date ?? new Date(parseInt(router.params.date))" :cellData="filteredbookingPerPlaceMap.get(getColumnId(n + 80))" :cellId="getColumnId(n + 80)" v-for="n in this.getGridDimension(this.numberOfUmbrella)[1]" @click="handlePlaceClick(getColumnId(n + 80))"/>
      </div>

    </div>
</div>
</template>
    
<script>

import Calendar from "./reservation/Calendar.vue";
import Ombrellone from "./Ombrellone.vue";
import { useUserStore } from '../../domain/user/userStore';
import { usePlaceStore } from "../../domain/place/placeStore";
import Place from "../../domain/place/place";
import { toRaw } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "BookingPage",
  emits: ["openModal", "toggleCalendar"],

  props: {
    date: String,
    numberOfUmbrella: Number,
  },

  setup(){
    const userStore = useUserStore();
    const placeStore = usePlaceStore();
   
    let bookingPerPlace = placeStore.getBookingPerPlace;
     
    let filteredbookingPerPlace = bookingPerPlace.filter((elem) => {
      if(toRaw(elem) instanceof Place){
        return toRaw(elem);
      }
    });

    const filteredbookingPerPlaceMap = new Map();
    filteredbookingPerPlace.map((elem) => {
      filteredbookingPerPlaceMap.set(`${elem.index}${elem.row}`, {beachId: elem.beachId, reservations: elem.reservations});
    });

    const router = useRoute();
    
    return {userStore, placeStore, filteredbookingPerPlaceMap, router};
  },

  mounted() {
    
    this.localDate.date = new Date(parseInt(this.router.params.date)); 
    console.log(this.localDate.date); 
    this.mounted = true;

  },

  data() {
    return {
      mounted: false,
      localDate: {formatted: null, date: null},
      isCalendarOpen: false,
      isCalendarAnimationFinished: false,
      closeCalendarClick: false,
      selectedPlace: null
    };
  },

  components: {
    Ombrellone,
    Calendar
  },

  methods: {
    getColumnId(index) {
      let columnIndex = Math.floor(index / 11) + 1;
      if(index > 80){
        columnIndex += 1;
      }
      
      let rowIndex = index % 10; 
      if(rowIndex === 0){
        rowIndex = 10;
      }
    
      const rowLetter = String.fromCharCode("A".charCodeAt(0) + rowIndex - 1 ); // Adjust row letter calculation

      return `${columnIndex}${rowLetter}`;
    },
    // get the umbrella grids dimension
    getGridDimension(number){
      
      let upRoundedNum = Math.round(number / 2);
      // If upRoundedNum last digit is not 0
      if(upRoundedNum % 10 !== 0){
        // Get the other half
        let downRoundedNum = upRoundedNum;
        let lastDigitUpRoundedNum = upRoundedNum % 10;
        
        // If division is not integer the downRoundNumber will have to decrease 
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
    setCalendarDate(date) {
        this.localDate.date = date;
    },
    handlePlaceClick(id){
      this.selectedPlace = id;
    }
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
    position: relative;
    top: 20px;
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
    row-gap: 2vmin;
    column-gap: 4.6vmin;
    margin: 20px 0;
    width: calc(100vw - 50px);
  }

  .center-ctn{
    grid-area: gridCtn;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contained {
    max-width: 100px;
  }

</style>