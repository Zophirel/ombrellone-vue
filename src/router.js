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
      props: { BookingPage: true, numberOfUmbrella: 150 },
      meta: { transition: 'booking-in-bottom' }
    },

    {  
      name: "LoggedIn",
      path: '/logged', 
      component: LoggedIn,  
      meta: { transition: 'logged-in-right' }
    },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;