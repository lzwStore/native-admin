<template>
  <div>
    <n-popover
      :style="{width: `${width}px`}"
      :placement="props.placement"
      :trigger="props.trigger"
      @update:show="handleUpdateShow"
    >
    <template #trigger>
      <slot></slot>
    </template>
    <ul class="flex items-center flex-wrap w600px list-none pointer h500px overflow-hidden overflow-y-auto">
      <li v-for="item in icons" :key="item" @click="onClick(item)">
        <component style="width: 30px;margin-left:10px" :is="getComponent(item)" />
      </li>
    </ul>
    </n-popover>
  </div>
</template>

<script setup lang='ts'>
import antdIcons from './icons'
import { PropType } from 'vue'
type PlacementType = 'left' | 'right' | 'top' | 'bottom';
type TriggerType = 'click' | 'hover';

const props = defineProps({
  modelValue: String,
  placement: {
    type: String as PropType<PlacementType>,
    default: 'bottom'
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'hover'
  },
  width: {
    type: Number,
    default: 600
  }
})
const emit = defineEmits(['update:modelValue'])

const icons = Object.keys(antdIcons).filter((_, i) => i < Object.keys(antdIcons).length)

function getComponent(e: string) {
  return (antdIcons as Record<string, any>)[e]
}

function onClick(e: string) {
  emit('update:modelValue', e)
  console.log(e)
}
function handleUpdateShow() {

}
</script>

<style lang='less' scoped>

</style>
