<template> 

  <div class="home-page-ctn" @wheel="$emit('handleMouseWheel')"  @touchmove="$emit('handleTouchMove')" >
    <AuthModal v-if="showLoginModal && !userStore.isUserLogged"/>
    <!-- <ReservationModal v-if="showReservationModal" :fullName="`Aziz Brazorf`"/> -->
    <h1>PRENOTA<br/>IL TUO<br/>POSTO</h1>
    <img src="../../assets/chair.png" alt="">
    <!-- <div id="button"><img src="../assets/arrow_down.svg"></div>-->
    <div id="button"  @click="$emit('handleMouseWheelEvent')"><p> {{userStore.isUserLogged ? 'Prenota' : 'Accedi / Registrati'}}</p></div>
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
    grid-area: button;
    display: flex;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    background-color: #fff7eb;
  }
  #button > p {
    margin: 0;
    font-weight: bold;
  }

  @keyframes arrow {
    0%{
      bottom: 3px;  
    }
    
    50%{
      bottom: -4px;  
    }
    
    100%{
      bottom: 3px;
    }
  }

  #button > img {
    position: relative;
    animation-name: arrow;
    animation-iteration-count: infinite;
    animation-duration: 2s;

  }
 
  h1{
    grid-area: htext;
    text-align: start;
    font-size: 100px;
    font-weight: 900;
    -webkit-text-stroke: 2px black;
    font-family: 'Inter', sans-serif;
    color: rgba(0, 0, 0, 0);
    line-height: 80px;
    margin-bottom: 10px;
  }
  
  .home-page-ctn > img {
    grid-area: img;
    position: relative;
    width: 400px;
    top: 40px;
  }

  .home-page-ctn {
    background-color: #FFB342;
    display: grid; 
    grid-template-areas: "htext img"
                         "button button";
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
   
  }

  @media screen and (max-width: 500px) {
    h1{
      text-align: start;
      font-size: 17vw;
      line-height: 16vw;
      width: 88vw;
    }

    .home-page-ctn > img {
      position: relative;
      width: 90vw;
      top: 0;
    }
  }

  @media screen and (max-width: 900px) {
    .home-page-ctn {
      grid-template-areas: "htext"
                          "img"
                          "button";
    }
  }

</style>
