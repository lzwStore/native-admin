<template>
  <ul class="container_breadcrumb">
    <li v-for="item in tabsList" :key="item.name" @click="goPage(item)">
      <div class="li_content" :style="{background: app.theme === 'white' ? '' : 'rgb(56 56 66)'}">
        <span :class="{active: activeKey === item.path}">{{ t(item.meta.title) }}</span>
        <n-icon size="20" v-if="item.path !== '/index'" @click.stop="onClose(item)">
          <CloseOutline />
        </n-icon>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { CloseOutline } from '@vicons/ionicons5'
import useStore from '@/store/index'
import { RouteItem } from '@/store/modules/tabsView'
import { storage } from '@/utils/Storage'
import { TABS_ROUTES } from '@/store/mutation-types'
import { PageEnum } from '@/enums/pageEnum'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// const route: any = router.options.routes.filter(item => item.path === '/')[0].children
const { tabsView, app } = useStore()

// 获取简易的路由对象
const getSimpleRoute = (route: any): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}
let cacheRoutes: RouteItem[] = []

const simpleRoute = getSimpleRoute(route)
try {
  const routesStr = storage.get(TABS_ROUTES) as string | null | undefined
  cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute]
} catch (e) {
  cacheRoutes = [simpleRoute]
}

// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes()
// console.log('路由', routes)

cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path)
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta
    cacheRoute.name = (route.name || cacheRoute.name) as string
  }
})

// 初始化标签页
tabsView.initTabs(cacheRoutes)
// console.log('store', tabsView)

// 标签页列表
const tabsList: any = computed(() => tabsView.tabsList)
const whiteList: string[] = [
  PageEnum.BASE_LOGIN
]
// console.log('获取de标签', tabsList.value)
const activeKey = ref('')

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(route.name as string)) return
    activeKey.value = to
    tabsView.addTabs(getSimpleRoute(route))
  },
  { immediate: true }
)
function onClose(item: RouteItem) {
  // 删除当前激活的tab自动跳转上一个tab
  if (activeKey.value === item.fullPath) {
    const index = tabsView.tabsList.findIndex(ite => ite.fullPath === item.fullPath)
    router.push(tabsView.tabsList[index - 1].path)
  }
  tabsView.closeCurrentTab(item)
}
function goPage(item: RouteItem) {
  router.push(item.path)
}

// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  storage.set(TABS_ROUTES, JSON.stringify(tabsList.value))
})
</script>

<style lang="less" scoped>
.container_breadcrumb {
  height: 40px;
  list-style: none;
  li {
    display: inline-block;
    .li_content {
      transition: background-color .3s;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 4px 6px 4px 10px;
      border-radius: 2px;
      margin-right: 10px;
      .active {
        color: #18a058;
      }
      span {
        margin-right: 2px;
      }
      &:hover {
        cursor: pointer;
        span{
          color: #18a058;
        }
      }
    }
  }
}
</style>
