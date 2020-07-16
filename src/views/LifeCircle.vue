<template>
  <div class="life-clrcle">

  </div>
</template>

<script>
// vue 实例被创建时，data对象的所有属性都加入到 Vue 的响应式系统中，
// 即 vm.name === data.name
// 只有在实例被创建时就已存在于 data 的property才是响应式的
// 除了数据property，vue实例还暴露了一些有用的property和方法，都有前缀$

console.log('roor script')
export default {
  data () {
    console.log('data')
    return {
      name: 'liuhaoran'
    }
  },
  beforeCreate () {
    this.methodsData('beforeCreate')
  },
  created () {
    this.methodsData('created')
  },
  beforeMount () {
    this.methodsData('created')
  },
  mounted () {
    this.methodsData('mounted')
  },
  beforeUpdate () {
    this.methodsData('beforeUpdate')
  },
  updated () {
    this.methodsData('updated')
  },
  beforeDestroy () {
    this.methodsData('beforeDestroy')
  },
  destroyed () {
    this.methodsData('destroyed')
  },
  methods: {
    methodsData (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
