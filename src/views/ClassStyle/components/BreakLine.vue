<template>
  <div class="line">
    {{ propA }}
    {{ propB }}
    <el-button @click="emitTest" size="small">emitTest</el-button>
    <el-button @click="emitRename" size="small">renameEmit</el-button>
    <el-button @click="emitDom" size="small">emitDom</el-button>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

  @Component
  export default class BreakLine extends Vue {
    @Prop(Number) propA
    @Prop(String) propB

    count = 0

    @Emit()
    emitTest() {
      return 'test'
    }

    @Emit('renameEmit')
    emitRename() {
      return this.count++
    }

    @Emit()
    emitDom(e) {
      return e.target.value
    }
  }
</script>

<style lang="scss" scoped>
  .line {
    width: 100%;
    background-color: transparent;
    margin: 5px 0 10px;
  }
</style>
