// 获取当前设备类型
export default () => {
  const type = /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (type) {
    return 'mobile'
  }
  return 'pc'
}
