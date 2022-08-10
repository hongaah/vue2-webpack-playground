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
      <break-line
        :propA="0"
        propB="propB"
        @emit-test="getEmitTest"
        @renameEmit="getRenameEmit"
        @emit-dom="getEmitDom"
      ></break-line>
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
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { Hello, World } from './mixins/helloworld'
  import SlotComponent from '@/components/SlotComponent'
  import BreakLine from './components/BreakLine.vue'

  @Component({
    components: {
      SlotComponent,
      BreakLine,
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
    // 监听及计算
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
    // 生命周期
    created() {
      this.var2 = 'created 2'
    }
    mounted() {
      this.var3 = 'mounted 3'
    }

    // 方法
    fn1() {
      this.var2 = 'ok2'
      this.var3 = 'ok3'
      this.computedVar2 = 'set computed'
    }
    fn2() {
      this.$router.push({ path: '/Home' })
    }
    getEmitTest(e) {
      console.log('getEmitTest', e)
    }
    getRenameEmit(e) {
      console.log('getRenameEmit', e)
    }
    getEmitDom(e) {
      console.log('getEmitDom', e)
    }
    // 路由
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
