import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './presentation/components/HomePage.vue'
import BookingPage from './presentation/components/BookingPage.vue'
import LoggedIn from './presentation/components/LoggedIn.vue'
import BookedInfo from './presentation/components/BookedInfo.vue'
import Payment from './presentation/components/reservation/Payment.vue'
import PaymentSuccess from './presentation/components/reservation/PaymentSuccess.vue'
import ResetPassModal from './presentation/components/auth/ResetPassModal.vue'
import { useUserStore } from './domain/user/userStore'


const routes = [
  {  
    name: "Booking",
    path: '/booking/:date', 
    component: BookingPage,  
    props: { BookingPage: true, numberOfUmbrella: 150, warn: { msg: "" } },
    meta: { transition: 'booking-in-bottom', requiresAuth: true }
  },
  {
    name: "BookedInfo",
    path: '/bookedinfo/:bookingDataJSON',
    component: BookedInfo,
    props: true,
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {  
    name: "LoggedInDefault",
    path: '/logged', 
    component: LoggedIn,  
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {  
    name: "LoggedInBook",
    path: '/logged/:dateProp/:placeProp', 
    component: LoggedIn,
    props: true,  
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {  
    name: "LoggedInShowBooked",
    path: '/logged', 
    component: LoggedIn,
    props: { LoggedIn: true, bookedData: true },  
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {  
    name: "Payment",
    path: '/payment', 
    component: Payment,  
    props: true,
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {  
    name: "PaymentSuccess",
    path: '/payment/success', 
    component: PaymentSuccess,  
    meta: { transition: 'logged-in-right', requiresAuth: true }
  },
  {
    name: "ResetPassword",
    path: "/resetpassword/:data",
    component: ResetPassModal,
    props: true
  },
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


function isAuthenticated(){
  const userStore = useUserStore();
  if(userStore.isLogin){
    return true;
  } 
  return false;
}

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'HomeDefault' }); // Redirect to home page if not authenticated
    } else {
      next(); // Allow access if authenticated
    }
  } else {
    next(); // Allow access if no authentication is required
  }
});

export default router;