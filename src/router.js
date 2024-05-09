import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from './presentation/components/HomePage.vue'
import BookingPage from './presentation/components/BookingPage.vue'

const routes = [
    { 
      path: '/', 
      component: HomePage,
      meta: { transition: 'none' }
    },

    { 
      name: 'Booking', 
      path: '/booking', 
      component: BookingPage,  
      props: {
        date: new Date("6-28-24"), 
        numberOfUmbrella: 150
      },
      meta: { transition: 'booking-in-bottom' }
    },  
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;