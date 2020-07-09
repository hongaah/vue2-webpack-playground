import 'babel-polyfill'
import Vue from 'vue'

import './plugins/axios'
// import './plugins/element'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import '@/assets/css/global.css'

import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
