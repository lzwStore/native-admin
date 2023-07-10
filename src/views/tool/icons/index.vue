<template>
  <div>
    <Icons trigger="click" v-model="icon">
      <n-button type="primary">
        <template #icon>
          <n-icon>
            <component :is="getComponent(icon)"></component>
          </n-icon>
        </template>
        {{ icon }}
    </n-button>
    </Icons>
  </div>
  <div>

  </div>
</template>

<script setup lang='ts'>
import antdIcons from './icons'
import Icons from './icons.vue'
import { ref } from 'vue'

const icon = ref('BulbFilled')

function getComponent(e: string) {
  return (antdIcons as Record<string, any>)[e]
}

</script>

<style lang='less' scoped>

</style>
