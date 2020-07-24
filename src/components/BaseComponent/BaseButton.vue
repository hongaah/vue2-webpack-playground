<template>
  <div class="basic-button">
    <el-button @click.prevent="clickBtn">组件按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'BasicButton',
  methods: {
    clickBtn () {
      this.$message.info('hey, son btn')
    }
  }
}
</script>
