import { AddRouteRecordRaw } from './index'
import {
  Home,
  Person,
  PeopleSharp,
  Settings,
  BookmarkOutline,
  ExtensionPuzzle
} from '@vicons/ionicons5'

const pages: AddRouteRecordRaw[] = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/dashboard/dashboard.vue'),
    meta: {
      title: 'route.home',
      keepAlive: true,
      icon: Home
    }
  },
  {
    path: '/steam',
    name: 'steam',
    component: () => import('@/layout/views.vue'),
    meta: {
      title: 'route.steam',
      keepAlive: false,
      icon: Settings
    },
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/steam/user/user.vue'),
        meta: {
          title: 'route.user',
          keepAlive: false,
          icon: Person
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/steam/role/role.vue'),
        meta: {
          title: 'route.role',
          keepAlive: false,
          icon: PeopleSharp
        }
      }
    ]
  },
  {
    path: '/level',
    name: 'level',
    component: () => import('@/layout/views.vue'),
    meta: {
      title: 'route.menu',
      keepAlive: false,
      icon: Home
    },
    children: [
      {
        path: '/level_one',
        name: 'level_one',
        component: () => import('@/views/levels/one/one.vue'),
        meta: {
          title: 'route.one1'
        }
      },
      {
        path: '/level_two',
        name: 'level_two',
        component: () => import('@/layout/views.vue'),
        meta: {
          title: 'route.one2'
        },
        children: [
          {
            path: '/level_two_1',
            name: 'level_two_1',
            component: () => import('@/views/levels/two/two.vue'),
            meta: {
              title: 'route.two1',
              icon: BookmarkOutline
            }
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: 'route.components',
      keepAlive: false,
      icon: ExtensionPuzzle
    },
    component: () => import('@/layout/views.vue'),
    children: [
      {
        path: '/Editer',
        name: 'Editer',
        meta: {
          title: 'route.richText',
          keepAlive: false
        },
        component: () => import('@/views/tool/editer/editerPage.vue')
      }

      // {
      //   path: '/code',
      //   name: 'code',
      //   meta: {
      //     title: '代码编辑器',
      //     keepAlive: false
      //   },
      //   component: () => import('@/views/components/Code/Code.vue')
      // }
    ]
  },
  {
    path: '/chatGPT',
    name: 'chatGPT',
    meta: {
      title: 'route.chatGPT',
      keepAlive: false
    },
    component: () => import('@/views/tool/chatGPT/chatGPT.vue')
  }
]

export default pages
