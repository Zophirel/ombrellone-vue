import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from './presentation/components/HomePage.vue'
import BookingPage from './presentation/components/BookingPage.vue'
import LoggedIn from './presentation/components/LoggedIn.vue'
import BookedInfo from './presentation/components/BookedInfo.vue'
import Payment from './presentation/components/reservation/Payment.vue'
import PaymentSuccess from './presentation/components/reservation/PaymentSuccess.vue'
const routes = [
  { 
    name: "HomeDefault",
    path: '/', 
    component: HomePage,
    meta: { transition: 'home-out-right' }
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
    name: "BookedInfo",
    path: '/bookedinfo/:bookingDataJSON',
    component: BookedInfo,
    props: true,
    meta: { transition: 'logged-in-right' }
  },

  {  
    name: "LoggedInDefault",
    path: '/logged', 
    component: LoggedIn,  
    meta: { transition: 'logged-in-right' }
  },

  {  
    name: "LoggedInBook",
    path: '/logged/:bookingData', 
    component: LoggedIn,
    props: true,  
    meta: { transition: 'logged-in-right' }
  },

  {  
    name: "LoggedInShowBooked",
    path: '/logged', 
    component: LoggedIn,
    props: { LoggedIn: true, bookedData: true },  
    meta: { transition: 'logged-in-right' }
  },

  {  
    name: "Payment",
    path: '/payment/:paymentDataJSON', 
    component: Payment,  
    props: true,
    meta: { transition: 'logged-in-right' }
  },
  {  
    name: "PaymentSuccess",
    path: '/payment/success', 
    component: PaymentSuccess,  
    meta: { transition: 'logged-in-right' }
  },

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;