import { AddRouteRecordRaw } from './index'
import {
  Home,
  Person,
  PeopleSharp,
  Settings,
  BookmarkOutline,
  ExtensionPuzzle,
  // Open,
  DocumentTextSharp,
  CubeOutline,
  FolderOpenOutline
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
          keepAlive: true,
          icon: Person
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/steam/role/role.vue'),
        meta: {
          title: 'route.role',
          keepAlive: true,
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
          title: 'route.one1',
          keepAlive: false
        }
      },
      {
        path: '/level_two',
        name: 'level_two',
        component: () => import('@/layout/views.vue'),
        meta: {
          title: 'route.one2',
          keepAlive: false
        },
        children: [
          {
            path: '/level_two_1',
            name: 'level_two_1',
            component: () => import('@/views/levels/two/two.vue'),
            meta: {
              title: 'route.two1',
              keepAlive: true,
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
          keepAlive: true,
          icon: DocumentTextSharp
        },
        component: () => import('@/views/tool/editer/editerPage.vue')
      },
      {
        path: '/x6',
        name: 'x6',
        meta: {
          title: 'route.x6',
          keepAlive: false,
          icon: CubeOutline
        },
        component: () => import('@/views/tool/x6/x6.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        meta: {
          title: 'route.icons',
          keepAlive: false,
          icon: FolderOpenOutline
        },
        component: () => import('@/views/tool/icons/index.vue')
      }
    ]
  }
  // {
  //   path: '/chatgpt',
  //   name: 'chatgpt',
  //   meta: {
  //     title: 'route.chatgpt',
  //     keepAlive: false,
  //     icon: Open
  //   },
  //   component: () => import('@/layout/views.vue')
  // },
]

export default pages
