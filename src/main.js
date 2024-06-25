import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import connectSSE from './SSEClient';

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
connectSSE();
app
.use(router)
.use(pinia)
.mount('#app');