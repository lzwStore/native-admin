import { createApp } from 'vue'
import './assets/css/index.css'
import router from './router/index'
import { createPinia } from 'pinia'
import i18n from '@/utils/i18n/i18n'
import App from './App.vue'
import Svg from '@/components/SvgIcon/SvgIcon.vue'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
// 导入Unocss
import 'uno.css'
console.log('请求基础路径', import.meta.env.VITE_API_URL)

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(i18n)
app.component('SvgIcon', Svg)
app.mount('#app')
