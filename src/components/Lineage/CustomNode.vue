<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <Business class="text-26px w24px h40px"></Business>
    <n-tooltip
      trigger="hover"
      placement="right"
    >
      <template #trigger>
        <div class="truncate">
          {{ name }}
        </div>
      </template>
      {{ name }}
    </n-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { Business } from '@vicons/ionicons5'
const getNode = inject('getNode') as any
const currentNode = getNode()
const name = ref(currentNode.data.name)
// const type = ref(currentNode.data.type)
// const status = ref(currentNode.data.status)
// const data = reactive({
//   name: '',
//   type: '',
//   status: '',
//   iconMap: new Map([
//     ['system', 'icon-shujuyuanshili-shixin'], // 数据来源
//     ['table', 'icon-jisuanxieru'], // 模型
//     ['dataset', 'icon-shujuji1'], // 数据集
//     ['', 'icon-zhibiao'] // 指标
//   ]),
//   compType: {
//     system: {
//       feishu: '#707070', // 飞书
//       other: '#1296db' // 其他
//     },
//     table: {
//       fail: '#d81e06', // 失败
//       running: '#1296db', // 蓝色
//       success: '#0ba915', // 绿色
//       noStatus: '#0ba915' // 没有状态都是绿色
//     },
//     dataset: {
//       fail: '#d81e06', // 失败
//       running: '#1296db', // 运行中
//       success: '#0ba915', // 成功
//       noStatus: '#0ba915' // 绿色
//     },
//     dashboard: {
//       online: '#1296db', // 蓝色
//       notOnline: '#707070' // 灰色
//     }
//   }
// })
// console.log('自定义组件接收的数据', currentNode.data, );
// console.log(this.type, this.status, this.compType[this.type][this.status]);
// currentNode.on('change:data', (res) => {
//   console.log('自定义组件---->监听改变了', res);
// });

</script>
<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
  // background-color: pink;
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    font-size: 12px;
  }
  .iconfont {
    font-size: 30px;
    // color: #138bd6;
  }
}
</style>
