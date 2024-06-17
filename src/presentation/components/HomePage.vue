<template> 

  <div class="home-page-ctn" @wheel="$emit('handleMouseWheel')"  @touchmove="$emit('handleTouchMove')" >
    <AuthModal v-if="showLoginModal && !userStore.isUserLogged"/>
    <h1>PRONTO PER LA TUA PAUSA AL MARE?</h1>
    <div id="button" @click="$emit('handleMouseWheel')"><p> Prenota </p></div>
  </div>
</template>


<script>
  import AuthModal from "./auth/AuthModal.vue";
  import Calendar from "./reservation/Calendar.vue";
  import { useUserStore } from '../../domain/user/userStore';
  import ReservationModal from "./reservation/ReservationModal.vue";

  export default {
    name: 'HomePage',
    props: {
      showLoginModal: Boolean
    },

    data(){
      return {
        showReservationModal: true
      }
    },

    setup(){
      const userStore = useUserStore(); 
      return { userStore };
    },

    components: {
      AuthModal,
      ReservationModal,
      Calendar,
    },
    
  }

</script>

<style scoped>

  #button {
    display: flex;
    margin: 0 auto;
    padding: 10px 20px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: #FDD85D;
  }
  
  #button > p {
    margin: 0;
    font-weight: bold;
  }

  #button > img {
    position: relative;
    animation-name: arrow;
    animation-iteration-count: infinite;
    animation-duration: 2s;

  }
 
  h1{
    text-align: center;
    font-size: 100px;
    font-weight: 900;
    -webkit-text-stroke: 3px black;
    font-family: sans-serif;
    color: #ffffff1a;
    line-height: 80px;
    margin-bottom: 10px;
    max-width: 1024px;
  }
  
  .home-page-ctn > img {
    grid-area: img;
    position: relative;
    width: 400px;
    top: 40px;
  }

  .home-page-ctn {
    background-image: url('/src/assets/app_bg.jpg');
    background-position: center;
    display: flex;
    gap: 100px;
    flex-direction: column;
    background-size: cover;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: all 0.3s;
  }

  @media screen and (max-width: 500px) {
    h1{
      text-align: center;
      font-size: 17vw;
      line-height: 16vw;
      width: 88vw;
      margin: 0;
    }

    .home-page-ctn > img {
      position: relative;
      width: 90vw;
      top: 0;
    }
  }

</style>
