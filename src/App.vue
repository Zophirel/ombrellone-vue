<template>
<RouterView v-slot="{ Component, route }">
  <Transition :name="route.meta.transition">
    <component 
    :showLoginModal="this.showLoginModal && !userStore.isUserLogged"
    :is="Component" 
    @handleMouseWheel = handleMouseWheel
    @handleTouchMove = handleMouseWheel
    />
  </Transition>
</RouterView>
</template>

<script>

import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './domain/user/userStore';
import HomePage from './presentation/components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
  },

  emits:[
    'openModal', 
    'closeModal', 
    'showCalendar', 
    'hideCalendar', 
    'handleMouseWheel', 
    'handleTouchMove'
  ],

  setup(){
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    
    if(userStore.isLogin){
      router.push({name: "LoggedInDefault"})
    }

    return {
      route,
      userStore,  
    }
  },
  data(){
    return {
      fullName: "Mario Rossi",
      isBookingPageVisible: false, 
      homePageVisible: true, 
      isCalendarVisible : false,
      isModalVisible: false,
      clickedPlace: "",
      showLoginModal: false,
      isOverflowHidden: false
    };
  },

  methods: {
    handleTouchMove() {
      console.log("handle touch move");
      if(this.userStore.isUserLogged){
        this.handleMouseWheelEvent();
      } else {
        this.showLoginModal = true;
      }
    },

    handleMouseWheel() {
      if(this.userStore.isUserLogged){
        this.goToBooking();
      } else {
        this.showLoginModal = true;
      }
    },

    openModal(target){
        this.clickedPlace = target.getAttribute("data-custom");
        this.isModalVisible = true;
    },

    closeModal(){
      this.clickedPlace = "";
      this.isModalVisible = false;
    },

    showCalendar(){
      this.isBookingPageVisible = false;
      this.isCalendarVisible = true;
    },

    hideCalendar(date){
      console.log(`hide calendar ${date}`);
      this.date = date;
      this.isCalendarVisible = false;
      setTimeout(() => this.isBookingPageVisible = true, 400);      
    }
    
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#app:has(> .logged-in-right-enter-active) { 
  overflow: hidden; 
}

html {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  height: 100%;
}

/* Booking page animation */

@keyframes moveInBottom {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
 
.home-in-bottom-enter-active, .booking-in-bottom-enter-active {
  animation: moveInBottom 0.4s ease-out;
}

.home-in-bottom-leave-active, .booking-in-bottom-leave-active {
  display: none;
}

@keyframes moveInTop {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
 
.home-in-top-enter-active {
  overflow: hidden;
  display: none;
  animation: moveInTop 0.4s ease-out;
}

.home-in-top-leave-active {
  display: none;
}


@keyframes moveInRight {
  0% {
    transform: translateX(100px);

  }
  100% {
    transform: translateX(0px);

  }
}


.logged-in-right-enter-active {
  animation: moveInRight 0.4s ease-out;
}

.logged-in-right-leave-active {
  display: none;
}



</style>
