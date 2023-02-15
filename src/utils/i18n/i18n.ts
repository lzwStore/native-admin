import { createI18n } from 'vue-i18n'
import messages from './index'
import { getLanguageType } from '@/utils/localstorage'

const lang = getLanguageType('lang')
const i18n = createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: lang || 'zh',
  fallbackLocale: 'zh', // 默认中文
  messages
})

export default i18n
