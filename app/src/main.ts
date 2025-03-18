import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'

import App from './App.vue'
import router from './router'
import "./index.css"
import 'vuestic-ui/styles/essential.css';
import 'vuestic-ui/styles/typography.css';
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuestic())
app.use(VueQueryPlugin)

app.mount('#app')
