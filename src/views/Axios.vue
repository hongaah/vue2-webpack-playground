<template>
  <div class="axios">
    <el-button @click="AllReqMethods">
      get 获取数据
    </el-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created () {
    this.getCurrentData()
  },
  methods: {
    getCurrentData () {
      // 项目根目录获取数据可以直接写为 '/axios-data.json'
      // this.axios
      //   .get('/axios-data.json')
      //   .then(res => {
      //     console.log(res)
      //   })
      // get 方法的写法2
      // this.axios({
      //   method: 'get',
      //   url: '/data.json',
      //   params: {
      //     id: 1
      //   }
      // })
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    postMethods () {
      // put 和 patch 方法与 post 类似

      // application/json 常用
      // Content-Type: application/json;charset=UTF-8
      // this.axios
      //   .post('/xxx', {
      //     id: 1
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })

      // form-data 表单提交（图片上传，文件上传）
      // Content-Type: multipart/form-data; boundary=---WebkitFormBoundaryVDSSVV...
      // boundary 后面为参数编码后给后台解析
      // const formData = new FormData()
      // const data = {
      //   id: 1,
      //   name: 'hong'
      // }
      // for (const key in data) {
      //   formData.append(key, data[key])
      // }
      // this.axios
      //   .post('/xxx', formData)
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    AllReqMethods () {
      // this.axios
      //   .all([
      //     this.axios.get('/api/user/getAllUsername'),
      //     this.axios.get('/api/user/getBranchs')
      //   ])
      //   .then(
      //     this.axios.spread((user, branch) => {
      //       console.log(user, branch)
      //     })
      //   )
    },
    axiosInstance () {
      // 创建不同的 axios 实例
      // const instance = this.axios.create({
      //   baseURL: 'http://localhost:8081', // 请求的域名，基本地址
      //   timeout: 1000, // 请求超时时长 ms
      //   // url: '/data.json', // 请求路径
      //   // method: 'get,post,put,patch,delete',
      //   headers: { // 设置请求头
      //     token: ''
      //   },
      //   params: { // 请求参数拼接在url上

      //   },
      //   data: { // 请求体中的请求参数

      //   }
      // })
      // instance.get('/data.json').then(res => {
      //   console.log(res)
      // })
    },
    cancelRequest () {
      // 取消正在请求的请求
      // const source = this.axios.CancelToken.source()
      // this.axios
      //   .get('/data.json', {
      //     cancelToken: source.token
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

      // // 取消请求，message 可选
      // source.cancel('cancel http')
    }
  }
}
</script>
