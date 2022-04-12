import { createApp } from "vue"
import App from './App.vue'
import { store, key } from '../index'

const app = createApp(App)

app.use(store, key)