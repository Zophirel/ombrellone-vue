<template>
  <div class="ctn">
    <header>
      <img src="/src/assets/arrow_right.svg" @click="back">
      <p id="headerText">Info prentoazione</p>
    </header>
    <main>
      <div id="qr"></div>
      <h2> Nome e Cognome </h2>
      <p> {{ `${bookingData.userName} ${bookingData.userSurname}` }} </p>
      <hr>
      <h2> Data </h2>
      <p>  {{ `${days[new Date(bookingData.date).getDay()]} ${new Date(bookingData.date).toLocaleDateString()}` }}</p>
      <hr>
      <h2> Posto </h2>
      <p>  {{ `${bookingData.placeIndex}${bookingData.placeRow}` }}</p>
      <hr>
      <h2> Sdraio </h2>
      <p>  {{ `${bookingData.chairs}` }}</p>
      <hr>
      <h2> Prezzo </h2>
      <p>  {{ `€${bookingData.price}` }}</p>
    </main>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
  export default {
    name: "BookedInfo",
  
    props: {
      bookingJsonData: String
    },

    setup(){
      const router = useRouter();
      return { router  }
    },

    computed: {
      bookingData(){
        return JSON.parse(this.bookingJsonData);
      }
    },

    data() {
      return {
        days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
      }
    },

    methods: {
      async back(){
        await this.router.replace({name: "LoggedInShowBooked"});
      }
    }

  };
</script>

<style scoped>  

  .ctn{ 
    height: 100vh;
    width: 100vw;
  }
  header{
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 0.1fr 0.8fr 0.1fr;
    align-items: center;
    padding: 20px;

  }

  img{
    transform: rotate(180deg);
    justify-self: start;
    height: 8vmin;
  }

  #headerText{
    font-size: 24px;
    margin: 0;
    justify-self: center;
    font-weight: bold;
  }

  main{
    width: 300px;
    margin: 0 auto; 
  }


  main > h2, p {
    text-align: start;
    margin: 0;
    font-size: 25px;
  }

  main > h2 {
    margin-top: 20px;
  }


  #qr{
    height: 300px;
    background-color:cadetblue;
  }
</style>