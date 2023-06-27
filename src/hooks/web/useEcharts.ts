/* eslint-disable no-undef */
import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'

import { Fn, tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { unref, nextTick, computed, ref } from 'vue'

import { useEventListener } from '@/hooks/event/useEventListener'

import echarts from '@/utils/lib/echarts'
import useStore from '@/store'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme?: 'default'
) {
  const store = useStore()
  const getDarkTheme = computed(() => {
    return 'default'
  })
  watch(() => store.app.collapsed, () => {
    setTimeout(() => {
      resizeFn()
    }, 300)
  })

  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({})
  let removeResizeFn: Fn = () => {}
  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed((): EChartsOption => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value
    }
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, t)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
    resizeFn()
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options

    if (unref(elRef)?.offsetHeight === 0) {
      setOptions(unref(getOptions))
      return
    }
    nextTick(() => {
      if (!chartInstance) {
        initCharts()

        if (!chartInstance) return
      }
      clear && chartInstance?.clear()

      chartInstance?.setOption(unref(getOptions))
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  tryOnUnmounted(disposeInstance)

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkTheme.value as 'default')
    }
    return chartInstance
  }

  function disposeInstance() {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
    disposeInstance
  }
}
