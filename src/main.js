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

  ingressoPrezzo: 10,
  drinkPrezzo: 13,
  birraPrezzo: 18,
  tavoloPrezzo: 25,

  ingresso: true,
  drink: false,
  birra: false,
  tavolo: false,
  
  navetteAttive: false,
  soldOut: false,
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
