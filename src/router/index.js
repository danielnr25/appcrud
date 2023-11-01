import { createRouter, createWebHistory } from 'vue-router'
import ClienteView from '../views/ClienteView.vue'
import WelcomeView from '../views/WelcomeView.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/cliente',
    name: 'clienet',
    component: ClienteView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
