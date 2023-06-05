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
  nome: 'Traffic Light Night',
  data: 'Sabato 27 Maggio',
  luogo: 'Club Show',
  indirizzo: 'Via Alto Adige 83, Trento',
  link: '',

  drink: 11,
  birra: 18,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: true,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Il sabato della Spiaggia',
  data: 'Sabato 3 Giugno',
  luogo: 'Bar Spiaggia',
  link: 'https://drive.google.com/drive/folders/1TLGSH88D7norgihV_T-gs1QmTXs9mux2?usp=sharing',
}

app.use(router)
app.use(anu)
app.mount('#app')
