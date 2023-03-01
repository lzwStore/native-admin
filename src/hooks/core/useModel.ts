// 获取当前设备类型
export default () => {
  const uA = navigator.userAgent.toLowerCase() as any
  const ipad = uA.match(/ipad/i) === 'ipad'
  const iphone = uA.match(/iphone os/i) === 'iphone os'
  const midp = uA.match(/midp/i) === 'midp'
  const uc7 = uA.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
  const uc = uA.match(/ucweb/i) === 'ucweb'
  const android = uA.match(/android/i) === 'android'
  const windowsce = uA.match(/windows ce/i) === 'windows ce'
  const windowsmd = uA.match(/windows mobile/i) === 'windows mobile'
  if (!(ipad || iphone || midp || uc7 || uc || android || windowsce || windowsmd)) {
    // PC 端
    return 'pc'
  } else {
    // 移动端
    return 'mobile'
  }
}
