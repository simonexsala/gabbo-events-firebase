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
  nome: 'Il Sabato alla Spiaggia',
  data: 'Sabato 13 Maggio',
  luogo: 'Bar alla Spiaggia',
  indirizzo: 'Via dei Silari 3, Baselga di Piné',
  link: '',

  drink: 11,
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
  nome: 'White Night',
  data: 'Sabato 6 Maggio',
  luogo: 'Club Show',
  link: 'https://drive.google.com/drive/folders/1XrdJqaoRAcLeG6XxTU9on05-L2b5HeMW?usp=sharing',
}

app.use(router)
app.use(anu)
app.mount('#app')
