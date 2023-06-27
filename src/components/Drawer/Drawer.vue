<template>
  <n-drawer v-model:show="active" :width="width" :placement="props.placement" :on-after-leave="onLeave">
    <n-drawer-content :title="title">
      <div class="flex justify-between">
        <div class="light-green">隐藏标签页</div>
        <n-switch v-model:value="store.app.tabActive" @update:value="e => store.app.setSabActive(e)"/>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue'
import useStore from '@/store/index'
type Direction = 'left' | 'right' | 'top' | 'bottom';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Direction>,
    default: 'right'
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 350
  }
})
const emit = defineEmits(['update:active'])

const store = useStore()

const active = ref(false)

watch(() => props.active, (val) => {
  active.value = val
})

function onLeave() {
  emit('update:active', active.value)
}
</script>

<style lang='less' scoped>

</style>
