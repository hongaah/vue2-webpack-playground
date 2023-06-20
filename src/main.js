import 'babel-polyfill'
import Vue from 'vue'

import './plugins/axios'
// import './plugins/element'
// import './plugins/antdui'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import '@/assets/css/global.css'

import App from './App.vue'
import router from './router'
import store from './store'

// import VueComponentsApi from '@vue/composition-api' // vue3

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import './views/ClassStyle/class-component-hooks.js'

const requireComponent = require.context(
  './components/BaseComponent', // 其组件目录的相对路径
  false, // 是否查询其子目录
  /Base[A-Z]\w+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// 全局引入
Vue.use(ElementUI)
// Vue.use(VueComponentsApi)

Vue.config.productionTip = false

// 全局组件，可以直接使用，减少在多个页面中重复导入
// Vue.component('networkerror',networkerror);

// 每个Vue应用都是通过 Vue 函数创建一个新的 Vue 实例
new Vue({
  data: {
    test: 'test', // 不需要通过工厂函数返回
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
