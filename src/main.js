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
  nome: 'Pool Party',
  data: 'Domenica 2 Luglio',
  luogo: 'Hotel Ciclamino',
  indirizzo: 'Via Cargadori 1, Pietramurata',
  link: '',

  drink: 15.8,
  birra: 18,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: false,
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
