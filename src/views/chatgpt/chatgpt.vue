<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="h100% relative pl15px pr15px pt10px box-border">
    <n-page-header @back="handleBack">
    <template #title>
      返回
    </template>
  </n-page-header>
    <ul ref="chat" class="chat_container list-none">
      <li v-for="(item, index) in result" :key="index">
        <!-- chatGPT -->
        <div class="m-t-10px m-b-10px flex" v-for="(e, i) in item" v-if="Array.isArray(item)" :key="i">
          <i class="iconfont icon-ChatGPT text-27px mr10px"></i>
          <div v-html="e.replace(/\n/gm, '<br>')" class="p20px bg-#fff b-rd-10px"></div>
        </div>
        <!-- 用户 -->
        <div v-else class="flex justify-end">
          <div class="flex-center inline-block userclass">
            <div class="mr18px break-all m-t-10px m-b-10px text-16px bg-#fff b-rd-10px p10px">{{ item }}</div>
            <img :src="userImg" class="avatar w30px h30px b-rd-50% inline-block" alt="">
          </div>
        </div>
      </li>
    </ul>
    <div class="flex fixed bottom-50px pb50px send_area">
      <n-input
        v-model:value="value"
        placeholder="输入你的问题"
        autofocus
        class="mr10px flex-auto"
        @keydown.enter.stop="onSend"
      />
      <n-button type="primary" @click="onSend">
        发送
      </n-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { chatGPT } from '@/api/ChatGPT/index'
import userImg from '@/assets/images/user.jpeg'
import { useRouter } from 'vue-router'

const router = useRouter()
const value = ref('')
const chat = ref<HTMLElement | null>(null)
const result = reactive<any[]>([])
async function onSend() {
  const params = value.value.trim()
  if (!params) return
  result.push(params)
  scrollToBottom()
  value.value = ''
  const res = await chatGPT(params)
  result.push(res)
  scrollToBottom()
  console.log('结果', res)
}
function scrollToBottom() {
  nextTick(() => {
    chat.value!.scrollTop = chat.value!.scrollHeight
  })
}
function handleBack() {
  router.go(-1)
}
</script>

<style lang='less' scoped>
.chat_container {
  height: calc(100% - 150px);
  overflow: auto;
  .userclass {
    .avatar {
      flex-shrink: 0;
    }
  }
}
.send_area {
  width: calc(100% - 30px);
}
</style>
