<template>
  <main id="app">
    <div v-show="notify" class="notification-bg">
      <div class="notification-box">
        <p>La prenotazione corrente è stata appena presa</p>
      </div>
    </div>
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
  </main>
</template>

<script>

import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './domain/user/userStore';
import HomePage from './presentation/components/HomePage.vue'
import { usePlaceStore } from './domain/place/placeStore';
import { PlaceRepository } from './data/repository/place';
import eventBus from './eventBus';

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
    const placeStore = usePlaceStore();
    
    if(userStore.isLogin){
      router.push({name: "LoggedInDefault"})
    }

    return {
      route,
      router,
      userStore,
      placeStore
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
      isOverflowHidden: false,
      messages: [],
      notify: false
    };
  },
  created() {
    eventBus.on('new-message', this.addMessage);
  },
  beforeUnmount() {
    eventBus.off('new-message', this.addMessage);
  },
  methods: {
    addMessage(data) {
      console.log(data);
      this.messages.push(data);
      PlaceRepository.saveReservationInLocalStore(data);
      if(this.userStore.getPaymentData != null){
        if(this.userStore.getPaymentData.place == `${data.placeIndex}${data.placeRow}`){
          console.log("BOOKING IS NOT VALID ANYMORE")
          this.router.back();
          this.notify = true;
          setTimeout(() => {
            this.notify = false;
          }, 4000);
        }
      }
    },
    
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

.notification-bg {
  position: absolute;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
  top: -50px;
  animation: notificationAnimation 4s ease-in-out ;
}

@keyframes notificationAnimation {
  0% {
    top: -50px;
  }

  20% {
    top: 0px;
  }

  80% {
    top: 0px;
  }

  100% {
    top: -50px;
  }
}

.notification-box {
  background-color: rgb(250, 89, 89);
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
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
 
.booking-in-bottom-enter-active {
  animation: moveInBottom 0.4s ease-out;
}

.booking-in-bottom-leave-active {
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
    transform: translateX(10vw);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);  
    opacity: 1;
  }
}

@keyframes moveInLeft {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(10vw);
    opacity: 0;
    
  }
}

.logged-in-right-enter-active {
  animation: moveInRight 0.3s ease-out 0.3s;
}

.home-out-right-leave-active, .logged-in-right-leave-active {
  animation: moveInLeft 0.3s ease-out; 
}
</style>
