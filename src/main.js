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
  nome: 'Traffic Light Party',
  data: 'Sabato 15 Aprile',
  luogo: 'Club Show',
  link: 'Via Altoadige 83, Trento',

  birra: 18,
  drink: 10,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: false,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Memories',
  data: 'Sabato 1 Aprile',
  luogo: 'Rosalpina',
  link: 'https://maps.app.goo.gl/oL83XJCneepJep6D8'
}

app.use(router)
app.use(anu)
app.mount('#app')
