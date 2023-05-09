import { defineStore } from 'pinia'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { getStorage } from '@/utils/localstorage'

export const useConfigStore = defineStore('config', {
  state: () => ({
    theme: 'white', // white dark
    config: {
      type: getStorage('lang') || 'zh',
      language: getStorage('lang') === 'zh' ? zhCN : enUS,
      date: getStorage('lang') === 'zh' ? dateZhCN : dateEnUS
    }
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
    }
  }
})
