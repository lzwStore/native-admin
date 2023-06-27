import { defineStore } from 'pinia'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { getStorage, setStorage } from '@/utils/localstorage'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'white', // white dark
    config: {
      type: getStorage('lang') || 'zh',
      language: getStorage('lang') === 'zh' ? zhCN : enUS,
      date: getStorage('lang') === 'zh' ? dateZhCN : dateEnUS
    },
    collapsed: !!getStorage('collapsed') || false,
    tabActive: !!getStorage('tabActive') || false
  }),
  actions: {
    setLangageEN () {
      this.config.language = enUS
      this.config.type = 'en'
      this.config.date = dateEnUS
    },
    setLangageZH () {
      this.config.language = zhCN
      this.config.type = 'zh'
      this.config.date = dateZhCN
    },
    setCollapsed(val: boolean) {
      setStorage('collapsed', val)
      this.collapsed = val
    },
    setSabActive(val: boolean) {
      setStorage('tabActive', val)
      this.tabActive = val
    }
  },
  getters: {
    themeColor(state) {
      return state.theme === 'white' ? '#fff' : 'rgb(56 56 66) !important'
    }
  }
})
