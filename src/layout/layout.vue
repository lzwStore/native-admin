<template>
  <n-layout class="contariner">
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="60"
        :width="220"
        :inverted="inverted"
        :native-scrollbar="false"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <Logo :isShow="!!!collapsed"></Logo>
        <n-menu
          ref="menuInstRef"
          v-model:value="activeKey"
          :collapsed="collapsed"
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="routeList"
          key-field="path"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :on-update:value="onClick"
        ></n-menu>
      </n-layout-sider>
      <n-layout
        class="content"
        :native-scrollbar="false"
      >
        <HeaderVue
          v-model:collapsed="collapsed"
          @toggle="collapsed = !collapsed"
        ></HeaderVue>
        <n-layout-content class="layout_content">
          <Breadcrumb></Breadcrumb>
          <div
            class="content-box"
            style="padding: 0 10px 20px"
          >
            <router-view v-slot="{ Component, route }">
              <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component"></component>
              </keep-alive>
              <component
                v-else
                :is="Component"
              ></component>
            </router-view>
            <!-- <router-view></router-view> -->
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { NIcon, NEllipsis, MenuInst } from 'naive-ui'
import HeaderVue from './Header.vue'
import Breadcrumb from './Breadcrumb.vue'
import Logo from './Logo.vue'
// import type { MenuOption } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import useModel from '@/hooks/core/useModel'
import useStore from '@/store'
const store = useStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const routeList: any = router.options.routes.filter(item => item.path === '/')[0].children

const inverted = ref<boolean>(true)
const collapsed = ref(false)
const activeKey = ref<string | null>('')

if (useModel() === 'mobile') {
  collapsed.value = true
}

// 保存伸缩栏状态
watch(() => collapsed.value, () => {
  store.app.collapsed = collapsed.value
}, { immediate: true })

function renderMenuLabel(option: any) {
  return h(NEllipsis, null, {
    default: () => (/\./.test(option.meta.title) ? t(option.meta.title) : option.meta.title)
  })
}
function renderMenuIcon(option: any) {
  if (!option.meta.icon) return false
  return h(NIcon, null, { default: () => h(option.meta.icon) })
}

function onClick(key: string, item: any) {
  activeKey.value = key
  router.push(item.path)
}

// 根据路由默认高亮菜单
const menuInstRef = ref<MenuInst | null>(null)
watch(
  () => route.fullPath,
  to => {
    menuInstRef.value?.showOption(to)
    activeKey.value = to
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.contariner {
  height: 100vh;
  .n-layout-sider {
    height: calc(100vh);
  }

  .layout_content {
    height: calc(100vh - 60px);
    background-color: rgba(120, 120, 120, 0.1);
    overflow: hidden;
    .content-box {
      height: calc(100vh - 140px);
      overflow-y: auto;
      padding-bottom: 20px;
      margin-top: 5px;
    }
  }
}
// 滚动条宽度
::-webkit-scrollbar {
    width: 5px; /* 纵向滚动条*/
    height: 5px; /* 横向滚动条 */
    background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #ccc;
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #aaabad;
    border-radius: 10px;
}
</style>
