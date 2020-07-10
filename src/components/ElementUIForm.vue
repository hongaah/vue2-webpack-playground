<template>
  <div class="element-form">
    <el-card class="box-card card-form">
      <div slot="header">
        <span>elementUI 表单</span>
      </div>
      <div class="content">
        <el-form
          :model="formData"
          :rules="formRules"
          ref="form"
          label-width="100px"
          hide-required-asterisk
          :label-position="labelPosition"
        >
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="formData.telephone"></el-input>
          </el-form-item>
          <el-form-item label="报警阈值" prop="alert">
            <el-input v-model="formData.alert"></el-input>
            <span>(单位：μGy/h 或 μSy/h)</span>
          </el-form-item>
          <el-form-item label="MAC地址" prop="mac">
            <ul class="macAdress">
              <li v-for="(item, index) in formData.mac" :key="index">
                <input
                  type="text"
                  v-model="formData.mac[index]"
                  ref="macInput"
                  @input="checkIpVal(formData.mac[index], index)"
                  @keyup="turnIpPOS(formData.mac[index], index, $event)"
                />
                <div></div>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="IP 地址" prop="ip">
            <el-input v-model="formData.ip"></el-input>
          </el-form-item>
          <el-form-item
            label="产品特点"
            prop="character"
            >
            <div
              v-for="(character, index) in formData.character"
              :key="index"
              class="character"
            >
              <el-input
                v-model="formData.character[index]"
                :placeholder="`产品特点 ${index + 1}`"
              >
              </el-input>
              <el-button @click.prevent="removeData('character', index)" icon="el-icon-minus" circle size="mini" class="btn-del"></el-button>
              <el-button @click="addData('character')" icon="el-icon-plus" circle size="mini" class="btn-add"></el-button>
            </div>
          </el-form-item>
          <el-form-item label="产品照片" prop="imageUrl" id="imagePicture">
            <el-upload
              :action="uploadImageUrl"
              :http-request="handleImageUpload"
              :on-exceed="handleImageExceed"
              :before-upload="beforeImageUpload"
              :on-remove="handleImageRemove"
              :before-remove="beforeImageRemove"
              :file-list="formData.imageList"
              :show-file-list="true"
              :limit="1"
              class="image-border avatar-uploader"
            >
              <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">请上传 jpg/png 文件，且不超过 500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(true)">提交</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'element-form',
  data () {
    const checkNumber = (rule, value, callback) => {
      const reg = /^\d*(\.\d+)?$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字类型'))
      }
    }
    const checkMac = (rule, value, callback) => {
      const reg = /^[0-9A-Fa-f]{2}$/
      value.map(item => {
        if (!reg.test(item)) {
          callback(new Error('MAC 地址不合法'))
        }
      })
      callback()
    }
    const checkIP = (rule, value, callback) => {
      const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('格式不合法'))
      }
    }
    const checkData = (rule, value, callback) => {
      value.forEach(item => {
        if (!item) {
          callback(new Error('请输入产品数据'))
        }
      })
      callback()
    }

    return {
      formData: {
        telephone: '',
        alert: '',
        mac: ['', '', '', '', '', ''],
        ip: '',
        character: ['']
      },
      uploadImageUrl: '/api/product/uploadPicture',
      formRules: {
        alert: [
          { required: true, message: '请输入报警阈值', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        mac: [
          { required: true, message: '请输入 MAC 地址', trigger: 'blur' },
          { validator: checkMac, trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入 IP 地址', trigger: 'blur' },
          { validator: checkIP, trigger: 'blur' }
        ],
        character: [
          { required: true, validator: checkData, trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请选择产品照片', trigger: 'blur' }
        ]
      },
      labelPosition: 'right'
    }
  },
  mounted () {
    this.resizeForm()
  },
  methods: {
    checkIpVal (item, index) {
      if (item) {
        if (item.length === 2 && index !== 5) {
          this.$refs.macInput[index + 1].focus()
        }
      }
    },
    turnIpPOS (item, index, event) {
      const e = event || window.event
      // 左箭头
      if (e.keyCode === 37 && index !== 0) {
        this.$refs.macInput[index - 1].focus()
      }
      // 删除键
      if (e.keyCode === 8) {
        if (item.length === 0 && index !== 0) {
          this.$refs.macInput[index - 1].focus()
        }
      }
      // 右箭头、回车键、空格键、冒号
      if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) {
        if (index !== 5) {
          this.$refs.macInput[index + 1].focus()
        }
      }
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    resizeForm () {
      const resize = window.matchMedia('(max-width: 768px)')
      if (resize.matches) {
        this.labelPosition = 'top'
      } else {
        this.labelPosition = 'right'
      }
      resize.onchange = e => {
        if (e.matches) {
          this.labelPosition = 'top'
        } else {
          this.labelPosition = 'right'
        }
      }
    },
    removeData (val, index) {
      if (this.formData[val].length > 1) {
        this.formData[val].splice(index, 1)
      }
    },
    addData (val) {
      this.formData[val].push('')
    },

    // 上传照片
    handleImageUpload (image) {
      const loading = this.$loading.service({
        target: document.getElementById('imagePicture'),
        text: '上传照片中',
        fullscreen: false
      })
      const form = new FormData()
      form.append('file', image.file)
      this.axios
        .post(image.action, form, {
          'Content-Type': 'multipart/form-data'
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success('上传照片成功')
            this.formData.imageUrl = res.data.data
            this.formData.imageList = [{
              name: res.data.data,
              url: res.data.data
            }]
          }
        })
        .catch(() => {
          this.formData.imageList = []
          this.$message({
            type: 'error',
            message: '内部错误'
          })
        })
        .finally(() => {
          loading.close()
        })
    },
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpg' || 'image/jpeg' || 'image/png'
      const isLt500kb = file.size / 1024 / 1024 < 0.5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt500kb) {
        this.$message.error('上传图片大小不能超过 500KB!')
      }
      if (!isJPG || !isLt500kb) {
        this.formData.detailImageList = this.formData.detailImageList.filter(item => {
          return item.url !== file.url
        })
        this.formData.imageList = this.formData.imageList.filter(item => {
          return item.url !== file.url
        })
      }
      return isJPG && isLt500kb
    },
    handleImageExceed () {
      this.$message.warning('当前限制选择 1 个文件')
    },
    beforeImageRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleImageRemove (file, fileList) {
      this.formData.imageUrl = ''
      this.formData.imageList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.macAdress {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  color: #606266;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  list-style: none;

  li {
    position: relative;
    margin: 0;
  }
  li::after {
    content: '-';
    color: #094;
    position: absolute;
    bottom: 40px;
    right: 0;
    width: 2px;
    height: 2px;
  }
  li:last-child::after {
    content: '';
  }
  input:focus {
    outline: #094;
    border: #094;
  }
}
ul[class="macAdress"] input[type="text"] {
  border: none;
  width: 100%;
  height: 40px;
  text-align: center;
  color: #606266;
  background: transparent;
}
.character {
  margin-right: 10%;
  margin-bottom: 8px;
  white-space: nowrap;

  .btn-del {
    margin-left: 10px;
  }
  .btn-add {
    visibility: hidden;
  }
}
.character:nth-last-child(1) {
  .btn-add {
    visibility: visible;
  }
}
</style>
