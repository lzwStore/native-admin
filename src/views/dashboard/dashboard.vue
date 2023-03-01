<template>
  <n-grid
    x-gap="12"
    cols="1 s:2 m:4 l:4 xl:4 2xl:4"
    responsive="screen"
  >
    <n-gi
      v-for="item in list"
      :key="item.title"
      class="dashboard-header"
    >
      <div
        class="block_banner mb20px min-w200px"
        :style="{ background: app.themeColor }"
      >
        <div class="flex_column left">
          <div>
            <component :is="renderIcon(item)"></component>
            <div class="text">{{ item.title }}</div>
          </div>
          <n-statistic
            label=""
            tabular-nums
          >
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="item.total"
            />
          </n-statistic>
        </div>
        <div class="flex_column right">
          <div>周</div>
          <div class="flex_items_center">
            <n-tag
              type="success"
              size="small"
              round
            >
              {{ item.percent }}
            </n-tag>
            <n-icon
              style="margin-left: 10px"
              size="16"
              color="#0e7a0d"
            >
              <ArrowUpOutlined></ArrowUpOutlined>
            </n-icon>
          </div>
        </div>
      </div>
    </n-gi>
  </n-grid>
  <n-grid
    x-gap="24"
    cols="1 s:1 m:2 l:2 xl:2 2xl:2"
    responsive="screen"
  >
    <n-gi
      class="chart_container"
      :style="{ background: app.themeColor }"
    >
      <div class="title">访问量</div>
      <div
        ref="chartRef"
        class="chart"
        :style="{ height: 350 + 'px', width: '100%' }"
      ></div>
    </n-gi>
    <n-gi
      class="chart_container"
      :style="{ background: app.themeColor }"
    >
      <div class="title">销售额</div>
      <div
        ref="chartRef1"
        class="chart"
        :style="{ height: 350 + 'px', width: '100%' }"
      ></div>
    </n-gi>
  </n-grid>
  <n-grid
    x-gap="24"
    cols="1 s:1 m:2 l:2 xl:2 2xl:2"
    responsive="screen"
  >
    <n-gi
      class="chart_container"
      :style="{ background: app.themeColor }"
    >
      <div class="title">战斗力分析</div>
      <div
        ref="chartRef2"
        class="chart"
        :style="{ height: 350 + 'px', width: '100%' }"
      ></div>
    </n-gi>
    <n-gi
      class="chart_container"
      :style="{ background: app.themeColor }"
    >
      <div class="title">GDP分析</div>
      <div
        ref="chartRef3"
        class="chart"
        :style="{ height: 350 + 'px', width: '100%' }"
      ></div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import { FireFilled, ArrowUpOutlined, DollarOutlined, LaptopOutlined } from '@vicons/antd'
import type { Component, Ref } from 'vue'
import { useECharts } from '@/hooks/web/useEcharts'
import appStore from '@/store/index'
const { app } = appStore()

interface List {
  title: string
  total: number
  state: string
  percent: string
  color: string
  icon: Component
}
const list = reactive<List[]>([
  {
    title: '访问量',
    total: 12039,
    state: 'up',
    percent: '30%',
    color: '#c42d4b',
    icon: shallowRef(FireFilled)
  },
  {
    title: '销售额',
    total: 4039,
    state: 'up',
    percent: '30%',
    color: '#b37feb',
    icon: shallowRef(DollarOutlined)
  },
  {
    title: '订单量',
    total: 51039,
    state: 'up',
    percent: '30%',
    color: '#f49776',
    icon: shallowRef(LaptopOutlined) // 使用 shallowRef 避免组件被设置为响应式对象, 导致不必要的性能开销
  },
  {
    title: '成交额',
    total: 999999,
    state: 'up',
    percent: '30%',
    color: '#62a9f4',
    icon: shallowRef(DollarOutlined)
  }
])

function renderIcon(item: List) {
  return h(NIcon, { size: 24, color: item.color }, { default: () => h(item.icon) })
}

const chartRef = ref<HTMLDivElement | null>(null)
const chartRef1 = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
const chartRef3 = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>)
const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>)
const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions({
    tooltip: {
      // trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680'
        }
      }
    },
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      max: 6000,
      splitNumber: 4
    },
    series: [
      {
        data: [4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
        type: 'bar',
        barMaxWidth: 80,
        itemStyle: {
          // 这里是颜色
          color: function (params: { dataIndex: any }) {
            // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
            const colorList = [
              '#5470c6',
              '#91cc75',
              '#fac858',
              '#ee6666',
              '#73c0de',
              '#7fae90',
              '#ca8622',
              '#ffd3df'
            ]
            return colorList[params.dataIndex]
          }
        }
      }
    ]
  })
  setOptions1({
    title: {
      text: '销售额统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '毛衣' },
          { value: 735, name: '羽绒服' },
          { value: 580, name: '短袖' },
          { value: 484, name: 'Nick' },
          { value: 300, name: '包包' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  setOptions2({
    legend: {
      data: ['持续力', '攻击力'],
      orient: 'vertical',
      left: 'left'
    },
    radar: {
      indicator: [
        { name: '暴击', max: 6500 },
        { name: '普攻', max: 16000 },
        { name: '天马流星拳', max: 30000 },
        { name: '天马彗星拳', max: 38000 },
        { name: '钻石星尘拳', max: 52000 },
        { name: '星云气流', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '持续力'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '攻击力'
          }
        ]
      }
    ]
  })
  setOptions3({
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['北京', '上海', '深圳', '苏州', '广州', '杭州'].reverse()
    },
    series: [
      {
        name: '2021',
        type: 'bar',
        itemStyle: {
          // 这里是颜色
          color: function (params: { dataIndex: any }) {
            // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
            const colorList = [
              '#ffd3df',
              '#91cc75',
              '#fac858',
              '#ee6666',
              '#73c0de',
              '#7fae90',
              '#ca8622',
              '#5470c6'
            ]
            return colorList[params.dataIndex]
          }
        },
        data: [630230, 131744, 104970, 29034, 23489, 18203].reverse()
      },
      {
        name: '2020',
        type: 'bar',
        itemStyle: {
          // 这里是颜色
          color: function (params: { dataIndex: any }) {
            const colorList = [
              '#ffd3df',
              '#91cc75',
              '#fac858',
              '#ee6666',
              '#73c0de',
              '#7fae90',
              '#ca8622',
              '#5470c6'
            ]
            return colorList[params.dataIndex]
          }
        },
        data: [780230, 291744, 304970, 39034, 60489, 66203].reverse()
      }
    ]
  })
})
// console.log($t)
</script>

<style lang="less">
.block_banner {
  height: 108px;
  border-radius: 2px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  &:hover {
    box-shadow: 0px 0px 10px rgb(223, 223, 223);
  }
  .text {
    font-size: 15px;
  }
  .flex_column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    text-align: right;
  }
  .left {
    text-align: left;
  }
  .flex_items_center {
    display: flex;
    align-items: center;
  }
}
.chart_container {
  background-color: #fff;
  margin-bottom: 20px;
  .title {
    line-height: 40px;
    text-align: left;
    border-bottom: 1px solid rgba(118, 118, 118, 0.1);
    font-size: 16px;
    padding: 10px 20px;
    margin-bottom: 40px;
  }
  .chart {
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
</style>
