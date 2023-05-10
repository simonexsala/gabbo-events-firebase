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
  nome: 'Random Party',
  data: 'Venerdi 19 Maggio',
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

app.config.globalProperties.$oldEvento = {
  nome: 'White Night',
  data: 'Sabato 6 Maggio',
  luogo: 'Club Show',
  link: 'https://drive.google.com/drive/folders/1XrdJqaoRAcLeG6XxTU9on05-L2b5HeMW?usp=sharing',
}

app.use(router)
app.use(anu)
app.mount('#app')
