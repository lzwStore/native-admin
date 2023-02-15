export const getLanguageType = (key: string) => {
  const val = localStorage.getItem(key) || 'zh'
  if (typeof val === 'string' || val === null) {
    return val
  } else {
    return JSON.parse(val)
  }
}

export const setLanguageType = (key: string, val: any) => {
  if (typeof val === 'string') {
    localStorage.setItem(key, val)
  } else {
    localStorage.setItem(key, JSON.stringify(val))
  }
}

export const removeLanguageType = (key: string) => {
  localStorage.removeItem(key)
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
