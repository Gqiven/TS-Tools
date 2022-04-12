import { createApp } from "vue"
import App from './App.vue'
import router from '../index'

const app = createApp(App)

app.use(router)