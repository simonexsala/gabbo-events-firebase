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
  nome: 'Casual Party',
  data: 'Venerdì 19 Maggio',
  luogo: 'Club Show',
  indirizzo: 'Via Alto Adige 83, Trento',
  link: '',

  drink: 12.50,
  birra: 18,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: false,
  prevenditeOnline: true,
}

app.config.globalProperties.$nextEvento = {
  nome: 'Hawaiian Night',
  data: 'Sabato 20 Maggio',
  luogo: 'Rosalpina',
}

app.config.globalProperties.$oldEvento = {
  nome: 'Il sabato della Spiaggia',
  data: 'Sabato 13 Maggio',
  luogo: 'Bar Spiaggia',
  link: 'https://drive.google.com/drive/u/0/mobile/folders/1-dYqkHxPQnQBVoG_VwmCgepjAhrOHBRm?usp=sharing_eil_se_dm&ts=646217c4&huid=VWopB8hcLbpwTdtu0d_awA',
}

app.use(router)
app.use(anu)
app.mount('#app')
