import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import routerList from './pages'
import type { Component } from 'vue'
import { createDiscreteApi } from 'naive-ui'
import useStore from '@/store/index'

// 对RouteRecordRaw类型进行扩展
export type AddRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean,
  meta?: {
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
    children: routerList
  },
  {
    path: '/chatgpt',
    name: 'chatgpt',
    meta: {
      title: 'route.chatgpt',
      keepAlive: false
    },
    component: () => import('@/views/chatgpt/chatgpt.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  // 404 保底路由
  {
    path: '/:path(.*)*',
    name: '404',
    meta: {
      hidden: true,
      keepAlive: false
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/:path(.*)*',
        name: '',
        component: () => import('@/views/404/404.vue'),
        meta: {
          title: '登录',
          keepAlive: false
        }
      }
    ]
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
  const store = useStore()
  if (!store.user.isLogin && to.path !== '/login') {
    next({ path: '/login', replace: true })
    return
  }
  next()
})

router.afterEach(() => {
  loadingBar.finish()
})

export default router
