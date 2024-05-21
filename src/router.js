import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from './presentation/components/HomePage.vue'
import BookingPage from './presentation/components/BookingPage.vue'
import LoggedIn from './presentation/components/LoggedIn.vue'

const routes = [
    { 
      name: "HomeDefault",
      path: '/', 
      component: HomePage,
    },

    { 
      name: "HomeAnimation",
      path: '/', 
      component: HomePage,
      meta: { transition: 'home-in-top' }
    },

    {  
      name: "Booking",
      path: '/booking/:date', 
      component: BookingPage,  
      props: { BookingPage: true, numberOfUmbrella: 150, warn: {msg: ""} },
      meta: { transition: 'booking-in-bottom' }
    },

    {  
      name: "LoggedInDefault",
      path: '/logged', 
      component: LoggedIn,  
      meta: { transition: 'logged-in-right' }
    },

    {  
      name: "LoggedInData",
      path: '/logged/:dateProp/:optionProp/:placeProp', 
      component: LoggedIn,
      props: true,  
      meta: { transition: 'home-in-top' }
    },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;