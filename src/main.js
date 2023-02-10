import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { anu } from 'anu-vue'
import 'uno.css'
import 'anu-vue/dist/style.css'
import '@anu-vue/preset-theme-default/dist/style.css'
import './style.css'

const app = createApp(App)
app.config.globalProperties.$evento = {
  nome: 'Carnival party',
  data: '25 Febbraio',
  luogo: 'Rosalpina',
  birra: 17,
  drink: 15,
}

app.config.globalProperties.$oldEvento = {
  nome: 'miao party',
  data: '12 Novembre',
  luogo: 'BondONE',
  link: 'https://google.com',
}

app.use(router)
app.use(anu)
app.mount('#app')
