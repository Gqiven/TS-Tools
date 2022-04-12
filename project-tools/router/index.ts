import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/lazy',
    name: 'lazy',
    component: () => import('@/views/lazy.vue') // 懒加载 Axios 组件
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router