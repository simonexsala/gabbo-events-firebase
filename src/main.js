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
  nome: 'Il Martedì alla Spiaggia',
  data: 'Domenica 12 Luglio',
  luogo: 'Bar Spiaggia',
  indirizzo: 'Open Air',
  link: '',

  drink: 15.8,
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
  nome: 'Il Venerdì della Spiaggia',
  data: 'Venerdì 23 Giugno',
  luogo: 'Bar Spiaggia',
  link: 'https://drive.google.com/drive/folders/1ka7RPr34U25tmNxxONlZF2Ca9eSAHba9?usp=sharing',
}

app.use(router)
app.use(anu)
app.mount('#app')
