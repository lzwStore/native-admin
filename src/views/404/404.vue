<template>
  <div class="flex justify-center items-center h100%">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="onClick">找点乐子吧</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()

function onClick() {
  router.push('/index')
}
</script>

<style lang='less' scoped></style>
