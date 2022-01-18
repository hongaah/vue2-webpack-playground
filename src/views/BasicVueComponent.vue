<template>
  <div class="basic-vue">
    <el-row :gutter="20">
      <el-col :sm="24" :md="6"> <!-- 组件注册 -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>组件注册</span>
          </div>
          <div class="content">
            <!--
              组件名大小写：
              在dom，即非字符串模板中，只有kebab-case是有效的，其余都可以PascaCase
            -->
            <!--
              组件注册：
              局部注册：通过babel 和 webpack 使用es2015模块
              通用的基础组件的自动化全局注册：在 main.js 中全局注册通用的基础组件
            -->
            <BaseButton />
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- Prop -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>Prop</span>
          </div>
          <div class="content">
            <!--
              prop的大小写：
              在dom，即非字符串模板中，html 的属性只有kebab-case是有效的，js可以PascaCase
             -->

            <!--
              prop 的类型:
              见 BasicComponentSample.vue
              <BasicComponentSample title="component sample"/>
            -->

            <!--
              替换合并已有的
               attribute:
              替换：外部提供给组件的值会替换组件内部设置好的值(e.g. type)，除了style 和 class
              合并：style 和 class 合并父子组件定义的
            -->
            <BasicComponentSample title="component sample" type="primary" class="sample-class"/>

            <!--
              禁用 attribute 继承：
              如果不希望组件的根元素继承attribute，可以在组件中选项中设置 inheritAttrs: false
              inheritAttrs: false 不会影响到 style 和 class
            -->

          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- 自定义事件 -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>自定义事件</span>
          </div>
          <div class="content">
            <!--
              不同于组件名和html attribute，事件名不存在自动化大小转化且不会用作js变量或property名
              所以可以写做kebab-case。（事件名 e.g. @custom-event="doThis")
             -->

            <!--
              自定义组件的 v-model
              一个组件的v-model会默认利用 value的 prop 和 input 的事件
              但像单选框radio和复选框checkbox等类型的输入控件可能会将value用作不同目的
              model选https://cn.vuejs.org/v2/guide/components-custom-events.html项可以避免这种冲突，但需要在组件的props选项中声明checked，value不用
              ps: value 需要绑定value 和触发input事件
            -->
            <BaseCheckbox v-model="checkedData" /><span>{{ checkedData }}</span>

            <!--
              将原生事件绑定到组件，修饰符 .native
              在一个组件的根元素上直接监听一个原生事件，但有可能根元素不是你想要监听的那个元素

              $listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器
              有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有事件监听器指向这个组件的某个特定的子元素

              $listeners 形式如下：
              {
                focus: function (event) { /* ... */ },
                input: function (event) { /* ... */ }
              }
            -->
            <!-- <BaseInput @focus.native="onFocus"> -->

            <!--
              .sync 修饰符 实现双向绑定
              等价于 子组件向父组件emit一个事件 让父组件更改 父组件传给子组件的值
              https://cn.vuejs.org/v2/guide/components-custom-events.html
             -->
          </div>
        </el-card>
      </el-col><el-col :sm="24" :md="6"> <!-- 插槽 -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>插槽</span>
          </div>
          <div class="content">
            <SlotComponent>
              <!--
                v-slot:default 等价于 #default
                v-slot 只能添加到 template 上
              -->
              <template #default>
                <h1>自定义标题</h1>
              </template>
              <template #paragraph>
                <p>自定义段落</p>
              </template>
              <!--
                作用域插槽：访问子组件的数据
                user为 { "user": { "name": "hong" } }
              -->
              <template #sonData="user">
                <p>{{ user }}</p>
              </template>
              <!--
                解构
                user为 { "name": "hong" }
              -->
              <template #sonData1="{ user }">
                <p>{{ user }}</p>
              </template>
              <!--
                解构并重命名为 person
                person 为 { "name": "hong" }
              -->
              <template #sonData2="{ user: person }">
                <p>{{ person }}</p>
              </template>
              <!--
                解构并自定义后备内容
              -->
              <template #sonData3="{ user = { name: 'vip' } }">
                <p>{{ user }}</p>
              </template>
            </SlotComponent>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- 动态组件 & 处理边界情况 -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>动态组件 处理边界情况</span>
          </div>
          <div class="content">
            <!--
              在动态组件上使用 keep-alive:
              在组件间切换，保持组件的状态以避免反复重渲染导致的性能问题
             -->
            <keep-alive>
              <!-- <component :is="currentTabCompoennt"></component> -->
            </keep-alive>

            <!-- 处理边界情况 -->
            <!--
              访问根实例 $root
              所有子组件都可以将这个实例作为全局store来访问和使用
              这里的根实例指的是 main.js 里的new Vue
              可以进行读写根实例的数据、计算属性、方法等
             -->
            <div>
              <span>根实例：</span>
              <p>{{ $root.test }}</p>
            </div>

            <!--
              访问父级组件 $parent
              它提供了一种机会，可以让子组件在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式
              但当需要向任意更深层级的组件提供上下文信息时要用到 “依赖注入”
            -->

            <!--
              访问子组件实例或子元素 $refs

              通过 ref 这个 attribute 为子组件赋予一个 ID 引用
              父组件可以调用定义了ref的子组件或子组件内部定义了ref的元素

              当 ref 和 v-for 一起使用的时候，$refs 将会是一个包含了对应数据源的这些子组件的数组

              $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
              即在父组件 mounted 周期之后，因为子组件在父组件的mounted生命周期前渲染完毕
              这仅作为一个用于直接操作子组件的“逃生舱” —— 你应该避免在模板或计算属性中访问 $refs。
            -->
            <SlotComponent ref="relatedComponent"></SlotComponent>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicComponentSample from '@/components/BasicComponentSample'
import SlotComponent from '@/components/SlotComponent'

export default {
  name: 'BasicVue',
  components: {
    BasicComponentSample,
    SlotComponent
  },
  data () {
    return {
      checkedData: false,
      syncData: 'sync'
    }
  },
  mounted () {
    console.log(this.$refs)
    console.log(this.$refs.relatedComponent)
  }
}
</script>

<style lang="scss" scoped>

</style>
