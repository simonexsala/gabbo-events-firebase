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
  link: '',

  birra: 18,
  drink: 11.06,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: false,
  tavoloOpzione: false,
  
  navetteAttive: false,
  soldOut: true,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Traffic Light Party',
  data: 'Sabato 15 Aprile',
  luogo: 'Club Show',
  link: 'https://drive.google.com/drive/folders/1Z9wWx4VbhyAe0cvoRncU8t9TJ40qVQol?usp=sharing',
}

app.use(router)
app.use(anu)
app.mount('#app')
