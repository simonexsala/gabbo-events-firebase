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
  nome: 'Memories',
  data: 'Sabato 1 Aprile',
  luogo: 'Rosalpina',
  link: 'https://maps.app.goo.gl/oL83XJCneepJep6D8',

  birra: 18,
  drink: 14,
  tavolo: 25,

  birraOpzione: false,
  drinkOpzione: true,
  tavoloOpzione: true,
  
  navetteAttive: false,
  soldOut: true,
  prevenditeOnline: true,
}

app.config.globalProperties.$oldEvento = {
  nome: 'Fluo Party',
  data: '11 Marzo',
  luogo: 'Rosalpina',
  link: 'https://drive.google.com/drive/folders/1XRc40uq5PcGSEDxArj88uLdHcPl4pEgf?usp=share_link',
}

app.use(router)
app.use(anu)
app.mount('#app')
