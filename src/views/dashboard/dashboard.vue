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
        class="block_banner mb20px min-w168px"
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
      <div class="title">转化率</div>
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
      <div class="title">访问来源</div>
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
    total: 182039,
    state: 'up',
    percent: '30%',
    color: '#c42d4b',
    icon: shallowRef(FireFilled)
  },
  {
    title: '销售额',
    total: 14039,
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
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: 'rgba(226,226,226,0.5)'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        max: 80000,
        splitNumber: 4,
        axisTick: {
          show: false
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
          }
        }
      }
    ],
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    series: [
      {
        smooth: true,
        data: [
          111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
          11111, 4000, 2000, 500, 333, 222, 111
        ],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#5ab1ef'
        }
      },
      {
        smooth: true,
        data: [
          33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
          198, 60, 30, 22, 11
        ],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#019680'
        }
      }
    ]
  })
  setOptions1({
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center'
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
      bottom: 0,
      data: ['访问', '购买']
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
        {
          name: '电脑'
        },
        {
          name: '充电器'
        },
        {
          name: '耳机'
        },
        {
          name: '手机'
        },
        {
          name: 'Ipad'
        },
        {
          name: '耳机'
        }
      ]
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        },
        data: [
          {
            value: [90, 50, 86, 40, 50, 20],
            name: '访问',
            itemStyle: {
              color: '#b6a2de'
            }
          },
          {
            value: [70, 75, 70, 76, 20, 85],
            name: '购买',
            itemStyle: {
              color: '#5ab1ef'
            }
          }
        ]
      }
    ]
  })
  setOptions3({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '0%',
      left: 'center'
    },
    series: [
      {
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' }
        ],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100
        }
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
  }
  .chart {
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
</style>
