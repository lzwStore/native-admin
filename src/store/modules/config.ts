import { defineStore } from 'pinia'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { getLanguageType } from '@/utils/localstorage'

export const useConfigStore = defineStore('config', {
  state: () => ({
    theme: 'white', // white dark
    config: {
      type: getLanguageType('lang') || 'zh',
      language: getLanguageType('lang') === 'zh' ? zhCN : enUS,
      date: getLanguageType('lang') === 'zh' ? dateZhCN : dateEnUS
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
