<template>
  <n-layout-header
    class="layout_header"
    :style="bottomBorder"
  >
    <div>
      <n-icon
        class="mr10 center menu"
        size="26"
        @click="emit('toggle')"
      >
        <MenuUnfoldOutlined v-if="props.collapsed" />
        <MenuFoldOutlined v-else />
      </n-icon>
    </div>
    <div class="right">
      <n-icon
        @click="toggleFullScreen"
        class="mr10 center cursor"
        size="20"
      >
        <Contract v-if="screenState" />
        <ExpandOutline v-else />
      </n-icon>
      <n-dropdown
        trigger="hover"
        :inverted="store.app.theme === 'dark'"
        :options="options"
        @select="toggleLanguage"
      >
        <n-icon
          class="mr10 center"
          size="20"
        >
          <Language />
        </n-icon>
      </n-dropdown>
      <div
        class="center theme_conf"
        @click="toggleTheme"
      >
        <n-button quaternary>
          <span v-if="store.app.theme === 'white'">{{ t('msg.themeL') }}</span>
          <span v-else>{{ t('msg.themeW') }}</span>
        </n-button>
      </div>
      <div class="center theme_conf user_avatar">
        <n-dropdown
          :inverted="store.app.theme === 'dark'"
          trigger="hover"
          :options="configOptions"
          @select="onUserConfig"
        >
          <n-avatar
            round
            size="small"
            src="https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=1316535536,2169855958&os=1650322977,3711014696&simid=1316535536,2169855958&pn=19&rn=1&di=7169026086108397569&ln=1823&fr=&fmq=1675308204055_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=http%3A%2F%2Fimg.duoziwang.com%2F2019%2F02%2F04091610283767.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDYsNCwxLDUsMiw3LDgsOQ%3D%3D"
          />
        </n-dropdown>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useStore from '@/store/index'
import { Language, ExpandOutline, Contract } from '@vicons/ionicons5'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import screenFull from 'screenfull'
import { setLanguageType, getLanguageType } from '@/utils/localstorage'
import router from '@/router'

const store = useStore()
const { locale, t } = useI18n()

// 展开收起
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggle'])

let bottomBorder = ref({})
bottomBorder = computed(() => {
  return store.app.theme === 'white'
    ? { borderBottom: '1px solid rgb(239 239 245) !important' }
    : { borderBottom: '1px solid rgb(255 255 255 / 9%) !important' }
})

const options = reactive([
  {
    label: '英文',
    key: 'en',
    disabled: getLanguageType('lang') === 'en'
  },
  {
    label: '中文',
    key: 'zh',
    disabled: getLanguageType('lang') === 'zh'
  }
])

// eslint-disable-next-line space-before-function-paren
function toggleLanguage(val: string) {
  options.forEach(item => {
    if (val === item.key) {
      item.disabled = true
    } else {
      item.disabled = false
    }
  })
  setLanguageType('lang', val)
  if (val === 'zh') {
    store.app.setLangageZH()
  } else {
    store.app.setLangageEN()
  }
  locale.value = val
}

function toggleTheme() {
  store.app.theme = store.app.theme === 'white' ? 'dark' : 'white'
}

onMounted(() => {
  // 判断是否支持全屏
  if (screenFull.isEnabled) {
    screenFull.on('change', change) // 开启监听change事件
  }
})
onUnmounted(() => {
  if (screenFull.isEnabled) {
    screenFull.off('change', change)
  }
})

const message = useMessage()
const screenState = ref(false)
function change() {
  screenState.value = (screenFull as any).isFullscreen // 更新全屏状态
}
function toggleFullScreen() {
  // 加个判断浏览器是否支持全屏
  if (screenFull.isEnabled) {
    screenFull.toggle() // 切换全屏状态
  } else {
    message.error('您的浏览器不支持全屏')
  }
}

const configOptions = [
  {
    label: '首页',
    key: '/index'
  },
  {
    label: '个人设置',
    key: '/owner'
  },
  {
    label: '退出',
    key: '/login'
  }
]
const dialog = useDialog()
function onUserConfig(val: string) {
  if (val === '/login') {
    dialog.warning({
      showIcon: false,
      title: '提示',
      content: '确定退出吗？',
      positiveText: '确定',
      negativeText: '取消',
      positiveButtonProps: { type: 'info' }, // info primary
      onPositiveClick: () => {
        router.push(val)
        message.success('退出成功')
      },
      onNegativeClick: () => {
        message.error('已取消')
      }
    })
    return false
  }
  router.push(val)
}
</script>

<style scoped lang="less">
.layout_header {
  height: 60px;
  padding: 0 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(239 239 245); // rgb(255 255 255 / 9%)

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .theme_conf {
      cursor: pointer;
    }
  }
  .menu {
    cursor: pointer;
  }
}

.mr10 {
  margin-right: 10px;
}

.center {
  display: flex;
  align-items: center;
}

.user_avatar {
  margin-left: 10px;
  margin-right: 20px;
}

.cursor {
  cursor: pointer;
}
</style>
