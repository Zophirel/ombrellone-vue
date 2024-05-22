<template>
  <div id="modal-bg">
      <div id="modal">
          <div id="close" @click="closeModal">x</div>
          <h2>Prenotazioni</h2>
          <h2>Effettuate</h2>
          <ul>
            <li v-for="booking in placeStore.getUserBooking">
              <div class="tile">
                {{ (new Date(booking.date)).toLocaleDateString() }}
              </div>
            </li>
          </ul>
      </div>
  </div>
</template>
<script>

import { usePlaceStore } from "../../domain/place/placeStore";
import { useRoute } from "vue-router";
import { PlaceRepository } from "../../data/repository/place";
export default {
  name: "BookedModal",
    
  setup(){
    const placeStore = usePlaceStore();
    const router = useRoute();    
    return { placeStore, router }
  },

  

  async mounted() {

    if(this.placeStore.getUserBooking === null){
      console.log("BOOKED MOUNTED")
      this.placeStore.setUserBooking(await PlaceRepository.getUserBookings());
    }

    console.log();
  },

  data() {
    return {
      
    };
  },

  computed: {
    getUserBookings(){
      return this.placeStore.getBookingPerPlace;
    }
  },

  components: {
  
  },

  methods: {

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
  }

  ul {
    list-style: none;
    padding-left: 0;
    max-height: 500px;
    overflow: scroll;
  }

  h2{
    margin: 0;
    text-align: start;
    min-width: 300px;
  }

</style>