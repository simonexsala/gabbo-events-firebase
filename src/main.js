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
  data: 'Sabato 17 Maggio',

  luogo: 'Rosalpina',
  indirizzo: 'Via Pianizza 27, Trento',
  
  // luogo: 'Nova Club',
  // indirizzo: 'Via Alto Adige 83, Trento',
  
  // tipologia: 'Open bar fino a mezzanotte',
  tipologia: 'Ingresso con un drink',
  // tipologia: 'Ticket ingresso',
  link: '',

  drink: 16.5,
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
  nome: 'The Last Dance',
  data: 'Sabato 11 Maggio',
  luogo: 'Rosalpina',
  indirizzo: 'Via Pianizza 27, Trento',
  link: '',

}

app.use(router)
app.use(anu)
app.mount('#app')
