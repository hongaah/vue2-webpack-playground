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
      <el-col :sm="24" :md="12">
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
      }
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
