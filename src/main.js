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
  nome: 'Il Carnevale della città',
  data: '18 Febbraio',
  luogo: 'Sanbapolis',
  birra: 17,
  drink: 15,
  birraDrink: false,
  navetteAttive: false,
  soldOut: false,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Élite Party',
  data: '4 Febbraio',
  luogo: 'BondONE',
  link: 'https://google.com',
}

app.use(router)
app.use(anu)
app.mount('#app')
