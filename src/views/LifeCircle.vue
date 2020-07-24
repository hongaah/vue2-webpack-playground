<template>
  <div class="life-clrcle">
    <div class="module-container">
      <ComponentLifeCircle />
    </div>
  </div>
</template>

<script>
import ComponentLifeCircle from '@/components/ComponentLifeCircle'
// vue 实例被创建时，data对象的所有属性都加入到 Vue 的响应式系统中，
// 即 vm.name === data.name
// 只有在实例被创建时就已存在于 data 的property才是响应式的
// 除了数据property，vue实例还暴露了一些有用的property和方法，都有前缀$

// 存在 this 的从 created 生命周期开始
// 生命周期顺序：script root - beforeCreate - data - created - beforeMount - mounted
// 切换页面后调用顺序：deforeDestroy destroyed

// 如果有子组件，则调用的生命周期是：
// （子组件 script root） - script root - beforeCreate - data - created - beforeMount - （子组件 beforeCreate - data - created - beforeMount - mounted）- mounted
// 切换页面后调用顺序：deforeDestroy -（子组件 deforeDestroy - destroyed）- destroyed

console.log('1 script root')
export default {
  data () {
    console.log('3 data')
    return {
      name: 'liuhaoran',
      content: []
    }
  },
  components: {
    ComponentLifeCircle
  },
  beforeCreate () {
    // 没有 this
    console.log('2 console beforeCreate', this.name)
  },
  created () {
    this.methodsData('4 created', this.name)
  },
  beforeMount () {
    this.methodsData('5 beforeMount', this.name)
  },
  mounted () {
    this.methodsData('6 mounted', this.name)
  },
  beforeUpdate () {
    this.methodsData('beforeUpdate', this.name)
  },
  updated () {
    this.methodsData('updated', this.name)
  },
  beforeDestroy () {
    this.methodsData('beforeDestroy', this.name)
  },
  destroyed () {
    this.methodsData('destroyed ', this.name)
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
