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
  nome: 'Mamacita',
  data: '25 Febbraio',
  luogo: 'Rosalpina',
  link: 'https://maps.app.goo.gl/oL83XJCneepJep6D8',

  birra: 18,
  drink: 15,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: true,
  tavoloOpzione: true,
  
  navetteAttive: false,
  soldOut: false,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Il Carnevale della città',
  data: '18 Febbraio',
  luogo: 'Sanbapolis',
  link: 'https://drive.google.com/drive/folders/1xpwC_DWPUiUiiX7FxaI2n87yf9Cv_Okb',
}

app.use(router)
app.use(anu)
app.mount('#app')
