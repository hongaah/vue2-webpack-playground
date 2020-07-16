<template>
  <div class="basic-vue">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <el-card class="box-card card-form">
          <div slot="header">
            <span>Native Input 上传文件</span>
          </div>
          <div class="content">
            <div class="header-avatar">
              <div class="avatar-content">
                <el-avatar
                  :size="50"
                  fit="fill"
                  class="avatar"
                >user</el-avatar>
                <div class="avatar-hover">
                  <label for="upload" title="上传头像">
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleAvatarChange"
                      id="upload"
                      class="avatar-upload"
                    />
                  </label>
                  <i class="el-icon-camera"></i>
                </div>
              </div>
              <div class="header-name">user</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card>
          <div slot="header">
            <span>Vue Components</span>
          </div>
          <div class="content">
            <div class="computed">
              <p>
                computed: {{ computed1 }} {{ computed2 }}
              </p>
            </div>
            <div class="watch">
              <p>
                watch: {{ watchOutputData }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="8">
        <el-card>
          <div slot="header">
            <span>class and style</span>
          </div>
          <div class="content">
            <!-- v-bind 用于 class 和 style 时，表达式计算的结果可以是字符串、对象、数组 -->
            <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
            <div :class="classObject"></div>
            <div :class="[activeClass, errorClass]"></div>
            <div :class="[{ active: isActive }, errorClass]"></div>

            <div :style="{ color: activeColor, fontSize: fontSize + 'px'}"></div>
            <div :style="styleObject"></div>
            <div :style="[baseStyles, overridingStyles]"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-card>
          <div slot="header">
            <span>模板语法</span>
          </div>
          <div class="content">
            <!-- 一次性地插值 -->
            <span v-once>这个将不会改变: {{ onceMsg }}</span>
            <!-- rawHtml 整个替换 span -->
            <span v-html="'<p><em>dewfw</em></p>'"></span>
            <!-- 布尔 attribute 值只要存在就为true，但为null undefined false 时disabled 属性值甚至不会包含在渲染的button中 -->
            <button :disabled="null"></button>
            <!-- 模板表达式只能访问全局变量的一个白名单如Math Date -->
            {{ Math.random().toFixed(2) }}
            <!-- 对动态参数表达式的约束，浏览器会把attribute名全部强制转为小写 -->
            <!-- someAttr 会转换为 someattr -->
            <a :[someAttr]="value"></a>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-card>
          <div slot="header">
            <span>条件渲染</span>
          </div>
          <div class="content">
            <template v-if="a">
              <h1>title</h1>
              <p>paragraph1</p>
              <p>paragraph2</p>
            </template>
            <div v-else-if="b">
              v-else-if
            </div>
            <div v-else>
              v-else
            </div>
            <!-- 用key管理可复用的元素 -->
            <!-- Vue 会尽可能高效地渲染元素，通常会复用已有元素 -->
            <!-- 加了key，每次切换时，输入框都将被重新渲染 -->
            <!-- 否则 input 输入的值切换时不会变 -->
            <template v-if="loginType === 'username'">
              <label>Username</label>
              <input placeholder="Enter your username" key="username-input">
            </template>
            <template v-else>
              <label>Email</label>
              <input placeholder="Enter your email address" key="email-input">
            </template>

            <!-- v-if 只有初始渲染为真时才开始渲染，有着更高的切换开销 -->
            <!-- v-show 不管条件如何都会渲染，进行简单的css 切换，有着更高的初始渲染开销-->
            <!-- 建议不同时使用 v-if v-for -->
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'BasicVue',
  data () {
    return {
      message: 'test',
      firstname: '',
      lastname: '',
      watchOutputData: '',
      activeClass: 'active',
      errorClass: 'text-danger',
      isActive: true,
      hasError: false,
      activeColor: 'red',
      fontSize: '14',
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      baseStyles: {
        color: 'blue',
        fontSize: '14px'
      },
      overridingStyles: {
        color: 'green',
        fontSize: '15px'
      },
      onceMsg: 'peace',
      someAttr: 'href',
      someattr: 'alt'
    }
  },
  computed: {
    // 计算属性，基于响应式依赖进行缓存，只有在相关响应式依赖发生变化时它们才会重新求值
    classObject () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    computed2 () {
      // computed2 的值不会发生改变
      return Date.now()
    },
    fullName: {
      get: function () {
        return `${this.firstname} ${this.lastName}`
      },
      set: function (newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
    // 当需求是让一些数据随着其它数据变化而变化时
    // 可以计算合并这些依赖数据为一体，然后监听这个数据
  },
  watch: {
    // 侦听器可以响应数据变化，允许执行异步操作
    fullName (newVal, oldVal) {
      this.watchOutputData = 'watchOutut: ' + newVal
    }
  },
  methods: {
    handleAvatarChange (e) {
      // if (e.target.files[0]) {
      //   this.dataLoading = true
      //   const form = new FormData()
      //   form.append('img', e.target.files[0])
      //   this.axios
      //     .post('/api/user/uploadIcon', form)
      //     .then(({ data }) => {
      //       this.avatarIcon = data.data
      //       this.$message.success('上传头像成功')
      //       this.uploadAvatar()
      //     })
      //     .finally(() => {
      //       this.dataLoading = false
      //     })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;

  .avatar-content {
    .avatar {
      background-color: chartreuse;
    }
    .avatar-hover {
      display: none;
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.1s ease-in-out;
      background: #0f0e0e9a;
      color: #fff;
      cursor: pointer;

      .avatar-upload {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        opacity: 0;
      }
      .el-icon-camera {
        position: relative;
        top: -35px;
      }
    }
    &:hover {
      .avatar-hover {
        display: block;
        transform: translateY(-55px);
      }
    }
  }
  .header-name {
    position: absolute;
    display: inline-block;
    white-space: nowrap;
    color: #303133;
    font-size: 14px;
    left: 60px;
    top: 14px;
  }
}
</style>
