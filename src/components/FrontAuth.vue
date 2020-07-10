<template>
  <div class="auth">
    <el-row>
      <el-card class="box-card">
        <el-row>
          <el-col :sm="24" :lg="12" class="card-container">
            <div class="content">
              <div class="heading">
                <h1>高级设置</h1>
                <p>请输入密钥进行更多设备配置</p>
              </div>
              <el-form
                :model="auth"
                :rules="rules"
                ref="auth"
                label-width="100px"
                hide-required-asterisk
                label-position="top"
              >
                <el-form-item label="密钥" prop="pass">
                  <el-input v-model="auth.pass" @keyup.enter.native="submitForm('auth')"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('auth')" class="btn-auth">验证</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'front-auth',
  data () {
    return {
      auth: {
        pass: ''
      },
      rules: {
        pass: [{ required: true, message: '请输入密钥', trigger: 'blur' }]
      }
    }
  },
  methods: {
    encode (str) {
      let res = btoa(str)
      for (let i = 0; i < 4; i++) {
        res = btoa(res)
      }
      return res
    },
    decode (str) {
      let res = atob(str)
      for (let i = 0; i < 4; i++) {
        res = atob(res)
      }
      return res
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const code =
            'VjFSSmVGSXdNVWRqUm1oVllXdEtiMVp1Y0hOTlZsWldXa2QwYUZJd2NGbFVWbVJ1VUZFOVBRPT0='
          if (code === this.encode(this.auth.pass)) {
            this.$store.commit('setAuth', true)
            this.$message({
              type: 'success',
              message: '验证通过'
            })
          } else {
            this.$message({
              type: 'error',
              message: '验证失败'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 30px 0;
  position: relative;
  left: 25%;
}
@media screen and (max-width: 1199px) {
  .card-container {
    left: 0;
  }
}

.heading {
  text-align: center;
  padding: 20px 0;

  h1 {
    font-size: 20px;
    letter-spacing: 5px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #94a1ba;
    letter-spacing: 0.5px;
  }
}
.btn-auth {
  width: 100%;
}
</style>
