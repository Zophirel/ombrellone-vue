import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App)

app
.use(router)
.use(pinia)
.mount('#app');