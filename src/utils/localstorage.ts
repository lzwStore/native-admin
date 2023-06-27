// 存储数据
export const setStorage = (name: string, val: any) => {
  if (typeof val !== 'object') {
    window.localStorage.setItem(name, val)
  } else {
    window.localStorage.setItem(name, JSON.stringify(val))
  }
}

// 获取数据
export const getStorage = (name: string) => {
  const value = window.localStorage.getItem(name) as any
  try {
    const val = JSON.parse(value)
    return val
  } catch (error) {
    return value
  }
}

// 删除数据
export const removeStorage = (name: string) => {
  window.localStorage.removeItem(name)
}
/**
 * window.sessionStorage 浏览器临时缓存
 */
export const sessionStorage = {
  // 设置临时缓存
  set(key: string, val: any) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // 获取临时缓存
  get(key: string) {
    const json: any = window.sessionStorage.getItem(key)
    return JSON.parse(json)
  },
  // 移除临时缓存
  remove(key: string) {
    window.sessionStorage.removeItem(key)
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear()
  }
}
