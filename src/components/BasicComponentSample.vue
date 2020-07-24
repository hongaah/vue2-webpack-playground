<template>
  <div>
    <!-- $attrs 为父组件传了attribute值，而子组件未声明prop的值 -->
    <el-button class="basic-component" v-bind="$attrs">
      {{ $attrs }}
    </el-button>
  </div>
</template>

<script>
export default {
  // props: ['title'],
  // props: {
  //   title: String
  // }
  name: 'BasicComponentSample',
  inheritAttrs: false, // 禁用 Attribute 继承
  props: {
    mulitArr: [String, Number],
    title: {
      type: String,
      required: true
    },
    number: {
      // type 类型检验可以是String,Number,Boolean,Array,Function,Object,Symbol,Date 或者一个自定义的构造函数
      type: Number,
      // 默认值
      default: 100
    },
    Object: {
      type: Object,
      // 默认值：对象和数组都是通过一个工厂函数获取
      default: function () {
        return {
          message: 'hello'
        }
      }
    },
    validatorString: {
      validator: function (value) {
        return ['success', 'info', 'warning'].indexOf(value) !== -1
      }
    }
  }
}
</script>
