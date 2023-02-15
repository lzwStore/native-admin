import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import pages from './pages'
import type { Component } from 'vue'
import { createDiscreteApi } from 'naive-ui'

// 对RouteRecordRaw类型进行扩展
export type AddRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean,
  meta: {
    keepAlive: boolean,
    icon?: Component
  }
  // children: RouteRecordRaw[]
}

const { loadingBar } = createDiscreteApi(['loadingBar'])

const routes: AddRouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: () => import('@/layout/layout.vue'),
    meta: {
      title: '',
      keepAlive: true
    },
    children: pages
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  next()
})

router.afterEach(() => {
  loadingBar.finish()
})

export default router
