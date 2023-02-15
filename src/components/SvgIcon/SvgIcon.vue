<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{color: color, height: `${height}px`, width: `${width}px`}">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts" setup>

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  height: {
    type: [String, Number],
    default: 26
  },
  width: {
    type: [String, Number],
    default: 26
  }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>

<style lang='less'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
