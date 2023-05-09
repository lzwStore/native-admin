<template>
  <div id="app">
    <n-config-provider
      :theme="store.app.theme === 'white' ? null : darkTheme"
      :locale="store.app.config.language"
      :date-locale="store.app.config.date"
    >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
            <router-view></router-view>
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/index'
import { darkTheme } from 'naive-ui'
// import type { GlobalTheme } from 'naive-ui'
// const theme = ref<GlobalTheme | null>(null)
const store = useStore()

</script>

<style lang="less">
.n-config-provider {
  height: 100%;
  width: 100%;
}
* {
  transition: background 0.2s;
}
</style>
