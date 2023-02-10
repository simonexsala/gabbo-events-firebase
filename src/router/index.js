import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Prevendite from '../components/Prevendite.vue'
import Foto from '../components/Foto.vue'
import Eventi from '../components/Eventi.vue'
import Navette from '../components/Navette.vue'
import Info from '../components/Info.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/prevendite',
      component: Prevendite,
    },
    {
      path: '/eventi',
      component: Eventi,
    },
    {
      path: '/foto',
      component: Foto,
    },
    {
      path: '/navette',
      component: Navette,
    },
    {
      path: '/info',
      component: Info,
    },
  ],
})

export default router
