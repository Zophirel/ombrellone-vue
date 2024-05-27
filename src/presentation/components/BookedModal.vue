<template>
  <div id="modal-bg">
      <div id="modal">
          <div id="close" @click="$emit('toggleBookedModal')">x</div>
          <h2>Prenotazioni</h2>
          <h2>Effettuate</h2>
          <ul>
            <li v-for="(booking, index) in placeStore.getUserBooking" @click="goToBookingInfo(index)">
              <div class="tile">
                <div class="date">
                  <p class="dayName">{{ days[(new Date(booking.date)).getDay()] }}</p>
                  <p class="dayNumber">{{ (new Date(booking.date)).toLocaleDateString() }}</p>
                </div>
                <div class="arrow">
                  <img src="/src/assets/arrow_right.svg">
                </div>
              </div>
            </li>
          </ul>
      </div>
  </div>
</template>
<script>

import { usePlaceStore } from "../../domain/place/placeStore";
import { useRouter } from "vue-router";
import { PlaceRepository } from "../../data/repository/place";
export default {
  name: "BookedModal",
  emits:  ['toggleBookedModal'],
  setup(){
    const placeStore = usePlaceStore();
    const router = useRouter();    
    return { placeStore, router }
  },

  async mounted() {

    if(this.placeStore.getUserBooking === null){
      this.placeStore.setUserBooking(await PlaceRepository.getUserBookings());
    }
    console.log(this.placeStore.getUserBooking)
  },

  data() {
    return {
      days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
    };
  },

  computed: {
    getUserBookings(){
      return this.placeStore.getBookingPerPlace;
    }
  },

  methods: {
    async goToBookingInfo(index){

      await this.router.push (
        {
          name: "BookedInfo",
          params: {
            bookingJsonData: JSON.stringify(this.placeStore.getUserBooking[index]) 
          }
        }
      );
    },
  }

};
</script>

<style scoped>  
  @import '../../authModals.css';

  .tile{
    display: flex;
    height: 50px;
    background-color: #FDD85D;
    border-radius: 5px;
    margin-bottom: 15px;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    cursor: pointer;
  }


  .dayNumber {
    margin: 0;
    text-align: start;
  }

  .dayName {
    margin: 0;
    text-align: start;
    font-size: 20px;
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
    padding-bottom: 10px;
}

  ul {
    list-style: none;
    padding-left: 0;
    max-height: 500px;
    overflow: scroll;
    width: 100%;
    overflow-x: hidden;
    padding-right: 10px;
  }

  h2{
    margin: 0;
    text-align: start;
    min-width: 300px;
    font-size: 30px;
  }

</style>