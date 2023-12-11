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
  nome: 'PALACHRISTMAS',
  data: 'Venerdì 22 Dicembre',
  luogo: 'PalaLevico',
  indirizzo: 'Viale Lido 4, Levico',
  link: '',

  drink: 22,
  birra: 18,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: false,
  prevenditeOnline: false,
}

app.config.globalProperties.$oldEvento = {
  nome: 'TikTok Night',
  data: 'Giovedì 7 Dicembre',
  luogo: 'Rosalpina',
  link: '',
}

app.use(router)
app.use(anu)
app.mount('#app')
