# Vue 3 + ts + Vite + Naive

````
安装依赖
pnpm i

起动项目
pnpm dev 

项目采用lint-staged + husky 对commit的内容做校验, 不符合eslint规范不允许commit提交
````

用 vite 创建的 vue-ts 项目，初始化后，安装 Eslint 依赖，然后执行
npx eslint --init
自动生成的是 .eslintrc.cjs 文件

原因
package.json，里面应该有 type: module
于是 .js 被默认为使用了 ES module 规范，如果自动生成的配置文件使用了 CommonJS，就会出错 .cjs 的 js 会告诉 node.js 它使用了 CommonJS 规范，所以就不会出错
