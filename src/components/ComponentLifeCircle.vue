<template>
  <div class="life-clrcle">
    component
  </div>
</template>

<script>
// vue 实例被创建时，data对象的所有属性都加入到 Vue 的响应式系统中，
// 即 vm.name === data.name
// 只有在实例被创建时就已存在于 data 的property才是响应式的
// 除了数据property，vue实例还暴露了一些有用的property和方法，都有前缀$

// 存在 this 的从 created 生命周期开始
// 生命周期顺序：script root - beforeCreate - data - created - beforeMount - mounted
// 切换页面后调用顺序：deforeDestroy destroyed
console.log('component: 1 script root')
export default {
  data () {
    console.log('component: 3 data')
    return {
      name: 'liuhaoran'
    }
  },
  beforeCreate () {
    // 没有 this
    console.log('component: 2 console beforeCreate', this.name)
  },
  created () {
    this.methodsData('component: 4 created', this.name)
  },
  beforeMount () {
    this.methodsData('component: 5 beforeMount', this.name)
  },
  mounted () {
    this.methodsData('component: 6 mounted', this.name)
  },
  beforeUpdate () {
    this.methodsData('component: beforeUpdate', this.name)
  },
  updated () {
    this.methodsData('component: updated', this.name)
  },
  beforeDestroy () {
    this.methodsData('component: beforeDestroy', this.name)
  },
  destroyed () {
    this.methodsData('component: destroyed ', this.name)
  },
  methods: {
    methodsData () {
      console.log(...arguments)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
