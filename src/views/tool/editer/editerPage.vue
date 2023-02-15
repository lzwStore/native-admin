<template>
  <div class="editer_container">
    <Editer
      v-model:value="content"
      :height="700"
      @input="input"
    />
    <h2 style='margin-top: 20px;'>预览:</h2>
    <div style='margin-top: 20px;' v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import Editer from '@/components/Editor/Editor.vue'

const content = ref('测试内容')

const input = (value: string) => {
  content.value = value
}
</script>

<style scoped lang="less">
.editer_container {
  height: 100%;
  width: 100%;
}
</style>
