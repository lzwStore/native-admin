<template>
  <div class="lineage_container" :style="{'--toolHeight': `${toolHeight}px`}">
    <div class="lineage_comp"></div>
  </div>
</template>

<script setup lang='ts'>
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import type { PropType } from 'vue'
import { HeaderArr, DataParams } from './types/index'
import Node from './CustomNode.vue'

const props = defineProps({
  containerArr: {
    type: Array as PropType<HeaderArr>,
    default: () => ([])
  },
  customNode: { // 自定义组件
    type: Object,
    default: () => Node
  },
  dataList: {
    type: Array,
    default: () => ([])
  },
  lineColor: {
    type: String,
    default: '#BFC0C2'
  },
  edgeColor: {
    type: String,
    default: '#BFC0C2'
  }
})
const emit = defineEmits(['onClickNode'])

const nodes: any = ref([])
const edges: any = ref([])
const allNodes: any = ref([])
const graph: any = ref(null)
const lineWidth = 1
const titleHeight = 50
const compWidth = 120
const compHeight = 60
const padding = 4 // 在容器内的padding
const columnPadding = 1 // 列的padding
const containerWidth = ref(0)
const containerHeight = ref(0)
const columnNum = ref(0)
const columnWidth = ref(0)
const dom: any = ref(null)
const toolHeight = 40
onMounted(() => {
  dom.value = document.querySelector('.lineage_comp') as HTMLElement
  const box = dom.value.getBoundingClientRect()
  containerWidth.value = box.width // 容器宽
  containerHeight.value = box.height// 容器高
  columnNum.value = props.containerArr.length // 列数
  columnWidth.value = containerWidth.value / columnNum.value // 列宽
  console.log('box', containerWidth.value, containerHeight.value)
  console.log('列宽', columnWidth.value)

  const nodeEdgeParams = {
    containerHeight: containerHeight.value,
    titleHeight,
    columnWidth: columnWidth.value,
    compWidth,
    compHeight,
    dataList: props.dataList,
    padding,
    columnPadding
  }
  // 生成节点和边
  handlerData(nodeEdgeParams)
  // 注册 graph 实例
  registerGraph(containerWidth.value, containerHeight.value)
  // 注册 容器
  registerContainer(columnWidth.value)
  // 注册 边
  registerEdges()
  // 注册  自定义节点
  registerCustomNodes(compWidth, compHeight, props.customNode)
  // 添加节点
  addNodes()
  // 添加监听点击事件
  onAddEventListener()
})

function handlerData(params: DataParams) {
  // 设置每列容器宽度
  setColumnWidth()
  const {
    containerHeight,
    titleHeight: titleH,
    columnWidth: columnW,
    compWidth: compW,
    compHeight: compH,
    dataList: nodeList,
    padding,
    columnPadding
  } = params
  // 内容高度
  const contentHeight = containerHeight - titleH - (padding + columnPadding) * 2
  const nodeArr: any = []
  const edgeArr: any = []
  const obj: any = {}
  // 生成节点及属性
  nodeList.forEach((item: any) => {
    const currentObj: any = props.containerArr.find((he: any) => item.type === he.id)
    // 节点
    const node = {
      shape: 'vueNode',
      name: item.name,
      id: item.code,
      label: item.name,
      parent: currentObj.id, // 所在节点位置
      position: {
        // 节点x所在列位置 = 列所在x + 列宽的一半 - 自身的一半
        x: currentObj.position.x + columnW / 2 - compW / 2
        // y: 0,
      },
      ports: {
        groups: {
          group1: {
            attrs: {
              circle: {
                r: 1,
                magnet: false, // 是否启用手动桩连线
                stroke: 'transparent',
                fill: 'transparent',
                strokeWidth: 5
              }
            },
            position: {
              name: 'absolute'
            }
          }
        },
        items: [
          {
            id: 'left',
            group: 'group1',
            // 通过 args 指定绝对位置
            args: {
              x: '44%',
              y: '35%'
            }
          },
          {
            id: 'right',
            group: 'group1',
            // 通过 args 指定绝对位置
            args: {
              x: '58%',
              y: '35%'
            }
          }
        ]
      }
    }
    nodeArr.push(node)
    if (item.source.length) {
      item.source.forEach((el: any, i: any) => {
        edgeArr.push({
          // 边
          shape: 'lane_edge',
          name: i,
          target: { // 终点
            cell: el,
            port: 'right'
          },
          source: { // 起点
            cell: item.code,
            port: 'left'
          }
        })
      })
    }
    if (obj[item.type]) {
      obj[item.type].push(node)
    } else {
      obj[item.type] = [node]
    }
  })
  // console.log('所有节点', obj);
  Object.keys(obj).forEach((item) => {
    const nodeNumber = obj[item].length
    let iH = 0
    if (nodeNumber === 1) {
      iH = contentHeight
    } else {
      iH = contentHeight / nodeNumber // 计算出每一个块的高度
    }
    const itemHeight = iH / 2
    obj[item].forEach((el:any, index: number) => {
      // 计算出每一个节点的y
      el.position.y = iH * (index + 1) - itemHeight + compH / 2
    })
  })

  nodes.value = nodeArr
  edges.value = edgeArr
  allNodes.value = [...props.containerArr, ...nodeArr, ...edgeArr]
}

function registerGraph(width: number, height: number) {
  graph.value = new Graph({
    container: dom.value,
    width,
    height,
    // autoResize: true, // 自动适应外部容器大小
    interacting: { // 限制所有节点的交互
      nodeMovable: false, // 禁用节点移动
      magnetConnectable: false, // 当在具有 'magnet' 属性的元素上按下鼠标开始拖动时，是否触发连线交互。
      edgeMovable: false, // 边是否可以被移动。
      edgeLabelMovable: false, // 边的标签是否可以被移动。
      arrowheadMovable: false, // 边的起始/终止箭头是否可以被移动。
      vertexMovable: false, // 边的路径点是否可以被移动。
      vertexAddable: false, // 是否可以添加边的路径点。
      vertexDeletable: false // 边的路径点是否可以被删除
    },
    connecting: { // 当 snap 设置为 true 或者 false 代表开启和关闭连线过程中自动吸附
      router: 'orth'
    },
    // 保持节点在父容器内移动
    translating: {
      restrict(cellView) {
        const { cell } = cellView as any
        const parentId = cell.prop('parent')
        if (parentId) {
          const parentNode = graph.value.getCellById(parentId)
          if (parentNode) {
            return parentNode.getBBox().moveAndExpand({
              x: 0,
              y: 30, // 节点在父容器内可移动的范围
              width: 0,
              height: -30
            })
          }
        }
        return cell.getBBox()
      }
    }
  })
}

function registerContainer(columnWidth: number) {
  Graph.registerNode(
    'lane_container',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'rect',
          selector: 'rect_title'
        },
        {
          tagName: 'text',
          selector: 'title_name'
        }
      ],
      attrs: {
        body: {
          fill: '#FFF', // 背景色
          stroke: props.lineColor, // 边框色
          strokeWidth: lineWidth // 线粗
        },
        rect_title: {
          width: columnWidth, // 表头宽度
          height: titleHeight, // 表头高度
          fill: '#fff', // 背景色
          stroke: props.lineColor, // 边框色
          strokeWidth: lineWidth, // 线粗
          x: 0 // x偏移量
        },
        title_name: {
          ref: 'rect_title',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'none', // bold none ...
          fill: '#000',
          fontSize: 16
        }
      }
    },
    true
  )
}
// 边
function registerEdges() {
  Graph.registerEdge(
    'lane_edge',
    {
      inherit: 'edge',
      router: {
        name: 'normal' // 直线连接
      },
      // connector: { name: 'rounded' },
      attrs: {
        line: {
          // targetMarker: 'classic',
          stroke: props.edgeColor,
          strokeWidth: 1 // 线粗
        }
      }
    },
    true
  )
}

// 注册自定义节点
function registerCustomNodes(compW: any, compH: any, node: any) {
  register({
    shape: 'vueNode',
    width: compW,
    height: compH,
    component: node
  })
}
// 添加 所有节点边
function addNodes() {
  allNodes.value.forEach((item: any) => {
    if (item.shape === 'lane_edge') {
      graph.value.addEdge(item)
    } else {
      graph.value.addNode({
        data: { // 要传入自定义组件的数据
          name: item.name,
          type: item.parent,
          nodeType: item.type,
          id: item.id,
          status: item.parent === 'table' ? 'running' : 'fail'
        },
        ...item
      })
    }
  })
}
// 设置每列宽度
function setColumnWidth() {
  // 设置列宽/高和每列的位置
  props.containerArr.forEach((item, index) => {
    item.height = containerHeight.value - padding * 2
    item.width = columnWidth.value
    if (index === 0) {
      item.position.x = padding
    } else {
      item.position.x = columnWidth.value * index - padding
    }
    item.position.y = padding
  })
}
// 添加 事件
function onAddEventListener() {
  // 监听点击事件
  graph.value.on('node:click', ({ node }: any) => {
    if (node.data.nodeType === 'vessel') return
    emit('onClickNode', node)
    const findEdges = edges.value.filter((item: any) => item.source.cell === node.id)
    // console.log('找到的边', findEdges);
    const allEdge = graph.value.getEdges()
    // console.log('获取所有的边', allEdge);
    findEdges.forEach((edge: any) => {
      const edgeInstances = allEdge.filter((item: any) => item.source.cell === edge.source.cell)
      // console.log('匹配的边', edgeInstances);
      if (!edgeInstances.length) {
        graph.value.addEdge(edge)
      } else {
        // 已添加的边来删除
        edgeInstances.forEach((e: any) => {
          e.remove()
        })
      }
    })
  })
}
// 全部连线
function onAllLink() {
  onCancelLink()
  edges.value.forEach((edge: any) => {
    graph.value.addEdge(edge)
  })
}

// 取消连线
function onCancelLink() {
  const allEdge = graph.value.getEdges()
  allEdge.forEach((item: any) => {
    item.remove()
  })
}

watch(() => props.edgeColor, (val) => {
  console.log(val)
  const edgeArr = graph.value.getEdges()
  edgeArr.forEach((edge: any) => {
    edge.attr('line/stroke', val)
  })
})

watch(() => props.lineColor, (val) => {
  const nodeArr = graph.value.getNodes()
  nodeArr.forEach((node: any) => {
    if (node.data.nodeType === 'vessel') {
      node.attr('body/stroke', val)
      node.attr('rect_title/stroke', val)
    }
  })
})

defineExpose({
  onAllLink,
  onCancelLink
})
</script>

<style lang='less' scoped>
.lineage_container {
  width: 100%;
  height: calc(100% - var(--toolHeight));
  .lineage_comp {
    width: 100%;
    height: 100%;
  }
}
</style>
