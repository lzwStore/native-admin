// 数据
export const data = [
  {
    name: '神秘代表预估看板数据报表',
    code: '33839',
    type: 'dataset',
    source: [
      'estimate_sys_rebuild.estimate_detail',
      'estimate_sys_rebuild.estimate_history_basic_data_config',
      'estimate_sys_rebuild.ads_sales_estimation__representative_pure_pin_df',
      'estimate_sys_rebuild.estimate_statistic_by_sales',
      'estimate_sys_rebuild.estimate_expert',
      'estimate_sys_rebuild.wb_Jur_view_Neuro_endoc_Jur',
      'estimate_sys_rebuild.estimate_approval'
    ]
  },
  {
    name: 'estimate_sys_rebuild.estimate_detail',
    code: 'estimate_sys_rebuild.estimate_detail',
    type: 'table',
    source: ['oudianyun', 'lingke']
  },
  {
    name: 'estimate_sys_rebuild.estimate_history_basic_data_config',
    code: 'estimate_sys_rebuild.estimate_history_basic_data_config',
    type: 'table',
    source: ['oudianyun', 'lingke']
  },
  {
    name:
        'estimate_sys_rebuild.ads_sales_estimation__representative_pure_pin_df',
    code:
        'estimate_sys_rebuild.ads_sales_estimation__representative_pure_pin_df',
    type: 'table',
    source: ['caigou', 'lingke']
  },
  {
    name: 'estimate_sys_rebuild.estimate_statistic_by_sales',
    code: 'estimate_sys_rebuild.estimate_statistic_by_sales',
    type: 'table',
    source: ['caigou', 'wangbao']
  },
  {
    name: 'estimate_sys_rebuild.estimate_expert',
    code: 'estimate_sys_rebuild.estimate_expert',
    type: 'table',
    source: ['wangbao', 'lingke']
  },
  {
    name: 'estimate_sys_rebuild.wb_Jur_view_Neuro_endoc_Jur',
    code: 'estimate_sys_rebuild.wb_Jur_view_Neuro_endoc_Jur',
    type: 'table',
    source: ['caigou']
  },
  {
    name: 'estimate_sys_rebuild.estimate_approval',
    code: 'estimate_sys_rebuild.estimate_approval',
    type: 'table',
    source: ['caigou']
  },
  {
    name: '欧电云系统',
    code: 'oudianyun',
    type: 'system',
    source: []
  },
  {
    name: '国际医疗专家看病小程序',
    code: 'minip',
    type: 'system',
    source: []
  },
  {
    name: '零氪系统',
    code: 'lingke',
    type: 'system',
    source: []
  },
  {
    name: '采购系统',
    code: 'caigou',
    type: 'system',
    source: []
  },
  {
    name: '网报',
    code: 'wangbao',
    type: 'system',
    source: []
  }
]

const cWidth = 100
const cHeight = 60
// 容器
export const containerArr = [
  {
    id: 'system',
    index: 1, // 所在位置
    shape: 'lane_container',
    type: 'vessel',
    width: cWidth,
    height: cHeight,
    position: {
      x: 1,
      y: 0
    },
    label: '数据来源'
  },
  {
    id: 'table',
    index: 2, // 所在位置
    shape: 'lane_container',
    type: 'vessel',
    width: cWidth,
    height: cHeight,
    position: {
      x: cWidth,
      y: 0
    },
    label: '模型'
  },
  {
    id: 'dataset',
    index: 3, // 所在位置
    shape: 'lane_container',
    type: 'vessel',
    width: cWidth,
    height: cHeight,
    position: {
      x: cWidth * 2,
      y: 0
    },
    label: '数据集'
  },
  // {
  //   id: 'mertic',
  //   index: 4, // 所在位置
  //   shape: 'lane_container',
  //   width: cWidth,
  //   height: cHeight,
  //   position: {
  //     x: cWidth * 3,
  //     y: 0,
  //   },
  //   label: '指标',
  // },
  {
    id: 'dashboard',
    index: 5, // 所在位置
    shape: 'lane_container',
    type: 'vessel',
    width: cWidth,
    height: cHeight,
    position: {
      x: cWidth * 3,
      y: 0
    },
    label: '看板'
  }
]
