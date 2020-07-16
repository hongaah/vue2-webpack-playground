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

// 全局引入
Vue.use(ElementUI)

Vue.config.productionTip = false

// 每个Vue应用都是通过 Vue 函数创建一个新的 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
