<!-- 第二种方法 canvas 绘制干扰点干扰线 -->
<template>
  <div
    class="s-canvas"
    @click="createdCode"
  >
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['getIdentifyCode'])
const props = defineProps({
  fontSizeMin: {
    type: Number,
    default: 25
  },
  fontSizeMax: {
    type: Number,
    default: 30
  },
  backgroundColorMin: {
    type: Number,
    default: 255
  },
  backgroundColorMax: {
    type: Number,
    default: 255
  },
  colorMin: {
    type: Number,
    default: 0
  },
  colorMax: {
    type: Number,
    default: 160
  },
  lineColorMin: {
    type: Number,
    default: 100
  },
  lineColorMax: {
    type: Number,
    default: 255
  },
  dotColorMin: {
    type: Number,
    default: 0
  },
  dotColorMax: {
    type: Number,
    default: 255
  },
  contentWidth: {
    type: Number,
    default: 120
  },
  contentHeight: {
    type: Number,
    default: 34
  }
})
const identifyCode = ref('')

onMounted(() => {
  createdCode()
})
// 生成4个随机数
function createdCode () {
  const len = 4
  const codeList = []
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
  const charsLen = chars.length
  for (let i = 0; i < len; i++) {
    codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
  }
  identifyCode.value = codeList.join('')
  emit('getIdentifyCode', identifyCode.value.toLowerCase())
  drawPic()
}

// 生成一个随机数
function randomNum (min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}
// 生成一个随机的颜色
function randomColor (min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function drawPic () {
  const canvas = document.getElementById('s-canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  ctx!.textBaseline = 'bottom'
  // 绘制背景
  ctx!.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax)
  ctx!.fillRect(0, 0, props.contentWidth, props.contentHeight)
  // 绘制文字
  for (let i = 0; i < identifyCode.value.length; i++) {
    drawText(ctx, identifyCode.value[i], i)
  }
  drawLine(ctx)
  drawDot(ctx)
}

function drawText (ctx: any, txt: string, i: number) {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax)
  ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + 'px SimHei'
  const x = (i + 1) * (props.contentWidth / (identifyCode.value.length + 1))
  const y = randomNum(props.fontSizeMax, props.contentHeight - 5)
  const deg = randomNum(-45, 45)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate(deg * Math.PI / 180)
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate(-deg * Math.PI / 180)
  ctx.translate(-x, -y)
}

// 绘制干扰线
function drawLine (ctx: any) {
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax)
    ctx.beginPath()
    ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
    ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
    ctx.stroke()
  }
}

// 绘制干扰点
function drawDot (ctx: any) {
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}
</script>
<style scoped>
.s-canvas {
  height: 38px;
  cursor: pointer;
}
.s-canvas canvas {
  margin-top: 1px;
  margin-left: 8px;
}
</style>
