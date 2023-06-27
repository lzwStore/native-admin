<template>
  <div class="container_lineage">
    <div class="flex justify-center items-center">
      <div class="w90px flex">
        <n-color-picker
          v-model:value="lineColor"
          :show-preview="true"
          :render-label="() => '线条颜色'"
          :modes="['hex']"
          :swatches="[
            '#FFFFFF',
            '#18A058',
            '#2080F0',
            '#F0A020',
            'rgba(208, 48, 80, 1)'
          ]"
        />
      </div>
      <div class="w90px ml10px flex">
        <n-color-picker
          v-model:value="edgeColor"
          :show-preview="true"
          :render-label="() => '边颜色'"
          :modes="['hex']"
          :swatches="[
            '#FFFFFF',
            '#18A058',
            '#2080F0',
            '#F0A020',
            'rgba(208, 48, 80, 1)'
          ]"
        />
      </div>
      <n-button size="small" class="ml10px" type="primary" @click="onLink">全部连线</n-button>
      <n-button size="small" class="ml10px" @click="onRemoveLink">取消连线</n-button>
    </div>
    <Lineage
      ref="lineage"
      :dataList="data"
      :containerArr="containerArr"
      :customNode="CustomNode"
      :lineColor="lineColor"
      :edgeColor="edgeColor"
      @onLink="onLink"
    ></Lineage>
  </div>
</template>

<script setup lang='ts'>
import Lineage from '@/components/Lineage/Lineage.vue'
import CustomNode from '@/components/Lineage/CustomNode.vue'
import { data, containerArr } from '@/components/Lineage/data/data'

const lineage: any = ref(null)
const lineColor = ref(undefined)
const edgeColor = ref(undefined)
function onLink() {
  console.log(lineage)
  lineage.value.onAllLink()
}
function onRemoveLink() {
  lineage.value.onCancelLink()
}
</script>

<style lang='less' scoped>
.container_lineage {
  width: 100%;
  height: 100%;
  .lineage_comp {
    width: 100%;
    height: 100%;
  }
}
</style>
