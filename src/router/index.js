import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/prevendite',
      name: 'prevendite',
      component: () => import('../components/Prevendite.vue')
    },
    {
      path: '/eventi',
      name: 'eventi',
      component: () => import('../components/Eventi.vue')
    },
    {
      path: '/foto',
      name: 'foto',
      component: () => import('../components/Foto.vue')
    },
    {
      path: '/navette',
      name: 'navette',
      component: () => import('../components/Navette.vue')
    },
    { 
      path: "/:pathMatch(.*)*", 
      name: '404',
      component: () => import('../components/Error404.vue')
    },
  ],
})

export default router
