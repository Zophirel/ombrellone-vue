<template>
    <div id="modal-bg">
        <div id="modal">
            <div id="close" @click="closeModal">x</div>
            <h2>Prenotazioni effettuate</h2>
            <ul>
              <li v-for="booking in placeStore.getUserBooking">
                <div class="tile">
                  {{ booking.date }}
                </div>
              </li>
            </ul>
          <input type="button" value="Conferma" @click="book()" >
        </div>
    </div>
  </template>
  <script>
  
  import { usePlaceStore } from "../../domain/place/placeStore";
  import { useRoute } from "vue-router";
  import { PlaceRepository } from "../../data/repository/place";
  export default {
    name: "BookedModal",
    
    props: {
        date: Date,

    },

    setup(){
    },
  
    
  
    async mounted() {

    },
  
    data() {
      return {
        
      };
    },
  
    computed: {
    },
  
    components: {
    
    },
  
    methods: {
  
    }
  
  };
  </script>
  
  <style scoped>  
    
  
  </style>