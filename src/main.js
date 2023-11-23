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
  nome: 'TikTok Night',
  data: 'Giovedì 7 Dicembre',
  luogo: 'Rosalpina',
  indirizzo: 'Via Pianizza 27, Trento',
  link: '',

  drink: 15,
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
  nome: 'Muevelo',
  data: 'Sabato 7 Ottobre',
  luogo: 'Rubik',
  link: '',
}

app.use(router)
app.use(anu)
app.mount('#app')
