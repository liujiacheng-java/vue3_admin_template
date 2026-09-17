import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routers'
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
