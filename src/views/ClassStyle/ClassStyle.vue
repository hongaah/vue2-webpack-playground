<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>基础</span>
      </div>
      <el-button @click="fn1" size="small">修改 var</el-button>
      <div>var2: {{ var2 }}</div>
      <div>var3: {{ var3 }}</div>
      <div>computedVar2：{{ computedVar2 }}</div>
      <div>computedVar3：{{ computedVar3 }}</div>
      <div>computedVar4：{{ computedVar4 }}</div>
      <div>watchVar2: {{ watchVar2 }}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>mixins</span>
      </div>
      <div>from mixins：{{ hello }} {{ world }}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>组件</span>
      </div>
      <slot-component>导入组件的新标题</slot-component>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>路由</span>
      </div>
      <el-button @click="fn2" size="small">jump home</el-button>
    </el-card>
  </div>
</template>

<script>
  // https://class-component.vuejs.org/
  // https://github.com/kaorun343/vue-property-decorator

  // import Vue from 'vue'
  import { mixins } from 'vue-class-component'
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import SlotComponent from '@/components/SlotComponent'
  import { Hello, World } from './mixins/helloworld'

  @Component({
    components: {
      SlotComponent,
    },
  })

  // export default class ClassStyle extends Vue {
  export default class ClassStyle extends mixins(Hello, World) {
    // var1 = undefined // not reactive
    var2 = null // reactive
    watchVar2 = null
    data() {
      return {
        var3: undefined, // reative as it is declared via `data` hook
      }
    }
    get computedVar2() {
      return 'get computed - ' + this.var2
    }
    get computedVar4() {
      return 'get computed - ' + this.var3
    }

    computedVar3 = null
    set computedVar2(val) {
      this.computedVar3 = val + ' - computedVar3'
    }

    @Watch('var2', { immediate: true, deep: true })
    onVar2Change(val) {
      this.watchVar2 = 'watch var2: ' + val
    }

    created() {
      this.var2 = 'created 2'
    }
    mounted() {
      this.var3 = 'mounted 3'
    }

    fn1() {
      this.var2 = 'ok2'
      this.var3 = 'ok3'
      this.computedVar2 = 'set computed'
    }
    fn2() {
      this.$router.push({ path: '/Home' })
    }
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter')
      next()
    }

    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate')
      next()
    }

    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave')
      next()
    }
  }
</script>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 10px;
  }
</style>
