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
  nome: 'Palahalloween',
  data: 'Martedì 31 Ottobre',
  luogo: 'PalaLevico',
  indirizzo: 'Viale Lido 4, Levico',
  link: '',

  drink: 15,
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
  nome: 'Muevelo',
  data: 'Sabato 7 Ottobre',
  luogo: 'Rubik',
  link: '',
}

app.use(router)
app.use(anu)
app.mount('#app')
