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
          <Breadcrumb style="padding: 10px 10px 0 10px"></Breadcrumb>
          <div
            class="mt10"
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

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const routeList: any = router.options.routes.filter(item => item.path === '/')[0].children

const inverted = ref<boolean>(true)
const collapsed = ref(false)
const activeKey = ref<string | null>('')

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
    .mt10 {
      height: calc(100vh - 140px);
      overflow-y: auto;
      padding-bottom: 20px;
      /*滚动条样式*/
      &::-webkit-scrollbar {
        width: 10px;
        /*height: 4px;*/
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
.n-layout-header {
  // background: rgba(128, 128, 128, 0.2);
  // padding: 24px;
}

.n-layout-sider {
  // background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  // background: rgba(128, 128, 128, 0.4);
}
</style>
