<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-header">
        <!-- <img src="@/assets/img/logo.png" alt="ratection" /> -->
        <span>TEST ADMIN</span>
      </div>
      <div class="login-content">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              @keyup.enter.native="submitForm('loginForm')"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('loginForm')" type="primary" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // async getUserData () {
    //   await this.axios.get('/api/user/getByName').then(({ data }) => {
    //     sessionStorage.setItem('icon', data.data.icon)
    //   })
    // },
    submitForm (formName) {
      console.log('log')
      console.error('error')
      console.info('info')
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = new FormData()
          form.append('username', this.loginForm.username)
          form.append('password', this.loginForm.password)
          this.axios.post('/api/auth/login', form).then(({ data }) => {
            if (data.code === 0) {
              this.$store.commit('setUser', data.data)
              sessionStorage.setItem('token', data.data.token)
              this.$router.push({ name: 'Home' })
            } else {
              this.$notify.warning({
                title: '提示',
                message: '用户名或密码错误'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;

  .login-wrap {
    width: 320px;
    height: 320px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0.5px 0.5px 2px 0 #b4b4b4;

    .login-header {
      margin: 40px auto 0;
      text-align: center;

      img {
        width: 65px;
        margin-right: 12px;
        vertical-align: middle;
      }
      span {
        position: relative;
        top: 5px;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
        color: #009944;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: -webkit-gradient(
          linear,
          37% 32%,
          36% 93%,
          from(#009944),
          to(#0ba550),
          color-stop(0.37, rgb(44, 170, 44))
        );
      }
    }
    /deep/.login-content {
      margin: 30px 28px 0;
      .el-input {
        border: 0;
        outline: none;
        border-radius: 0;
      }
      .el-input__inner {
        border: 0;
        outline: none;
        border-radius: 0;
        border-bottom: 1px solid #ebebeb;
      }
      .el-input__inner:hover {
        border-bottom-color: #f3f4f7;
      }
      .login-btn {
        width: 100%;
        outline: 0;
        border: none;
        border-radius: 0;
        margin-top: 10px;
      }
    }
  }

  .login-footer {
    width: 470px;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #b4b4b4;
  }
  @media screen and (max-width: 910px) {
    .login-footer {
      width: 288px;
    }
    .footer-break {
      display: none;
    }
    .footer-record {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
