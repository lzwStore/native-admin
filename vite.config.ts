import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { svgBuilder } from './src/components/SvgIcon/svgInstall'

// 这个配置 为了在html中使用 环境变量
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target]
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  // 获取 .env 环境配置文件
  // const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: './',
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        eslintrc: {
          // 第一次设置为true, 起动项目会生成.eslintrc-auto-import.json文件, 然后设置为false, 需要更新时再打开，防止每次更新都重新生成
          enabled: false
        }
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: getViteEnv(mode, 'VITE_API_TITLE')
          }
        }
      }),
      svgBuilder('./src/assets/svgs/') // 这里已经将src/assets/svgs/下的svg全部导入，无需再单独导入
    ],
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8899,
      open: true,
      proxy: {
        '/api': {
          target: 'https://api.youlai.tech',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    // 解决控制台 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/assets/css/index.less')}";`
          },
          javascriptEnabled: true
        }
      }
    }
  })
}
