'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// DOC: https://www.kancloud.cn/yunye/axios/234845

// axios 全局配置
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios 实例配置
const config = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 登录后将 token 保存到本地，请求时如果本地有缓存则在头部带上，
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // console.log(
    //   response.data,
    //   response.status,
    //   response.statusText,
    //   response.headers,
    //   response.config
    // )
    return response
  },
  function (error) {
    // Do something with response error
    // console.log(
    //   error.code,
    //   error.message,
    //   error.config,
    //   error.response, // 请求发送成功，获得响应
    //   error.response.data,
    //   error.response.status,
    //   error.response.headers
    // )

    // token 认证过期，错误码返回 403
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout' !== -1)) {
      Vue.prototype.$message({
        type: 'error',
        message: '请求超时'
      })
    }
    if (error.message.indexOf('Network Error') !== -1) {
      Vue.prototype.$message({
        type: 'error',
        message: '网络错误'
      })
    }

    if (error.response && error.response.status === 403) {
      sessionStorage.removeItem('token')
      location.href = '/'
    } else if (error.response && error.response.status === 500) {
      const codeMessage = {
        11000: '内部错误',
        15002: '没有权限操作'
      }
      for (const [code, msg] of Object.entries(codeMessage)) {
        if (error.response.data.code === parseInt(code)) {
          Vue.prototype.$notify.error({
            title: '错误',
            message: msg
          })
        }
      }
    }
    // return Promise.reject(error)
    return new Promise(() => {})
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
