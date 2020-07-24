<template>
  <div class="basic-vue">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12"> <!-- Native Input 上传文件 -->
        <el-card class="box-card card-form">
          <div slot="header">
            <span>Native Input 上传文件</span>
          </div>
          <div class="content">
            <div class="header-avatar">
              <div class="avatar-content">
                <el-avatar
                  :size="50"
                  fit="fill"
                  class="avatar"
                >user</el-avatar>
                <div class="avatar-hover">
                  <label for="upload" title="上传头像">
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleAvatarChange"
                      id="upload"
                      class="avatar-upload"
                    />
                  </label>
                  <i class="el-icon-camera"></i>
                </div>
              </div>
              <div class="header-name">user</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12"> <!-- computed and watch -->
        <el-card>
          <div slot="header">
            <span>computed and watch</span>
          </div>
          <div class="content">
            <div class="computed">
              <p>
                computed: {{ computed2 }}
              </p>
            </div>
            <div class="watch">
              <p>
                watch: {{ watchOutputData }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="6"> <!-- class and style -->
        <el-card>
          <div slot="header">
            <span>class and style</span>
          </div>
          <div class="content">
            <!-- v-bind 用于 class 和 style 时，表达式计算的结果可以是字符串、对象、数组 -->
            <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
            <div :class="classObject"></div>
            <div :class="[activeClass, errorClass]"></div>
            <div :class="[{ active: isActive }, errorClass]"></div>

            <div :style="{ color: activeColor, fontSize: fontSize + 'px'}"></div>
            <div :style="styleObject"></div>
            <div :style="[baseStyles, overridingStyles]"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- 模板语法 -->
        <el-card>
          <div slot="header">
            <span>模板语法</span>
          </div>
          <div class="content">
            <!-- 一次性地插值 -->
            <span v-once>这个将不会改变: {{ onceMsg }}</span>
            <!-- rawHtml 整个替换 span -->
            <span v-html="'<p><em>dewfw</em></p>'"></span>
            <!-- 布尔 attribute 值只要存在就为true，但为null undefined false 时disabled 属性值甚至不会包含在渲染的button中 -->
            <button :disabled="null">按钮</button>
            <!-- 模板表达式只能访问全局变量的一个白名单如Math Date -->
            {{ Math.random().toFixed(2) }}
            <!-- 对动态参数表达式的约束，浏览器会把attribute名全部强制转为小写 -->
            <!-- someAttr 会转换为 someattr -->
            <a :[someAttr]="value" href="cn.vue.org">123</a>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- 条件渲染 -->
        <el-card>
          <div slot="header">
            <span>条件渲染</span>
          </div>
          <div class="content">
            <template v-if="a">
              <h1>title</h1>
              <p>paragraph1</p>
              <p>paragraph2</p>
            </template>
            <div v-else-if="b">
              v-else-if
            </div>
            <div v-else>
              v-else
            </div>
            <!-- 用 key 管理可复用的元素 -->
            <!-- Vue 会尽可能高效地渲染元素，通常会复用已有元素 -->
            <!-- 加了key，每次切换时，输入框都将被重新渲染 -->
            <!-- 否则 input 输入的值切换时不会变 -->
            <template v-if="loginType === 'username'">
              <label>Username</label>
              <input placeholder="Enter your username" key="username-input">
            </template>
            <template v-else>
              <label>Email</label>
              <input placeholder="Enter your email address" key="email-input">
            </template>

            <!-- v-if 只有初始渲染为真时才开始渲染，有着更高的切换开销 -->
            <!-- v-show 不管条件如何都会渲染，进行简单的css 切换，有着更高的初始渲染开销-->
            <!-- 建议不同时使用 v-if v-for -->
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="6"> <!-- 列表渲染 -->
        <el-card>
          <div slot="header">
            <span>列表渲染</span>
          </div>
          <div class="content">
            <!-- 可以v-for...in/of 列表渲染数组、对象、数字范围 -->

            <!-- v-for 中可以访问所有父作用域的 parentProperty -->
            <!-- 可以用 of 替代 in 作为分隔符，更接近 JavaScript 迭代器的语法 -->
            <!-- 数组更新检测机制中，vue可以侦听数组变更方法/替换数组，触发视图更新，但vue不能侦听数组/对象的变化 -->
            <!-- 变更方法：push, pop, shift, unshift, splice, reverse, sort -->
            <!-- 替换数组：slice, concat, filter -->
            <!-- template遍历一组包含多个元素的内容, template不能被key -->
            <template v-for="(item, index) of arrItems">
              <span :key="'arrItemIndex' + index">{{ parentProperty }} - </span>
              <span :key="'arrItemMsg' + item.msg">{{ item.msg }}</span>
            </template>

            <!-- 遍历对象，值、键名、索引 -->
            <!-- 唯一 key 用于跟踪、标识节点 -->
            <div v-for="(value, name, index) of objItems" :key="'objItems' + index">
              <p>{{ name }}: {{ value }}</p>
            </div>

            <!-- 遍历数字范围 -->
            <div v-for="n in 5" :key="'numRange' + n">
              <span>{{ n }}</span> <!-- 结果：1 2 3 4 5 -->
            </div>

            <!-- v-for and v-if -->
            <!-- v-for 优先级比 v-if 高，会先遍历，再根据条件判断是否显示 -->
            <!-- 一般不建议一起使用 -->
            <ul>
              <li v-for="(todo, index) in todos" :key="'todos' + index">
                <span v-if="!todo.isComplete">{{ todo.msg }}</span>
              </li>
            </ul>

            <!-- 显示过滤/排序后的结果 -->
            <!-- 可以用computed、方法 -->
            <ul>
              <li v-for="n in evenNumbers" :key="'evenNumbers' + n">{{ n }}</li>
              <!-- <li v-for="n in even(numbers)">{{ n }}</li> -->
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="8"> <!-- 事件处理 -->
        <el-card>
          <div slot="header">
            <span>事件处理</span>
          </div>
          <div class="content">
            <!-- 默认传一个 event -->
            <button @click="greet">Greet</button>

            <!-- 显示传一个 $evnet，访问原始 DOM 事件 -->
            <button @click="warn('hello', $event)">hello</button>

            <!-- 1 事件修饰符 stop prevent capture self once passive   -->
            <!-- 阻止单击事件继续传播 @click.stop="stop"-->
            <!-- 提交事件不再重载页面 @click.prevent="prevent"-->
            <!-- 使用事件捕获模式，内部事件先在此处理，然后再交由内部元素处理 @click.capture="capture" -->
            <!-- 只当 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的 @lick.self="" -->
            <!-- 点击事件只发生一次，且可以用在dom上 @click.once="onct" -->
            <!-- 浏览器的默认行为立即触发，不能与prevent同时使用 -->
            <div @scroll.passive="passive" style="height: 50px;">passive</div>

            <!-- 修饰符可以串联 @click.stop.prevent="chuanlian" -->
            <!-- 可以只有修饰符 @click.prevent -->
            <!-- 修饰符的顺序 -->
            <el-button @click.prevent.self="stopAll">阻止所有行为</el-button>
            <el-button @click.self.prevent="stopSelf">阻止对元素自身的点击</el-button>

            <!-- 按键修饰符 enter tab delete esc space up down left right -->
            <!-- 系统修饰符 ctrl alt shift meta exact -->
            <el-button @click.ctrl.exact="onCtrlClick">with only ctrl</el-button>

            <!-- 鼠标修饰符 left right middle -->
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8"> <!-- 表单输入绑定 -->
        <el-card>
          <div slot="header">
            <span>表单输入绑定</span>
          </div>
          <div class="content">
            <!-- v-model是一个语法糖，会根据控件类型更新元素 -->
            <!-- v-model 会忽略表单元素的value/selected/checked初始值，而总是将vue实例的数据作为数据来源 -->

            <!-- 文本 v-model -->
            <!-- 多行文本 -->
            <p style="white-space: pre-line">{{ multiParagraph }}</p>
            <textarea name="multiParagraph" id="multiParagraph" cols="30" rows="3" v-model="multiParagraph"></textarea>

            <!-- 复选框 -->
            <!-- 单个复选框绑定为布尔值 -->
            <div>
              <el-input type="checkbox" id="checkbox" v-model="singleCheckbox"></el-input>
              <label for="checkbox">{{ singleCheckbox }}</label>
              <!-- 多个复选框绑定为数组 -->
              <el-input type="checkbox" id="a" value="a" v-model="multiCheckbox"></el-input>
              <label for="a">a:</label>
              <el-input type="checkbox" id="b" value="b" v-model="multiCheckbox"></el-input>
              <label for="b">b:</label>
              <el-input type="checkbox" id="c" value="c" v-model="multiCheckbox"></el-input>
              <label for="c">c:</label>
              <span> result: {{ multiCheckbox }}</span>
            </div>

            <!-- 单选框，v-model值对应value -->
            <div>
              <input type="radio" id="oneRadio" value="one" v-model="singleRadio">
              <label for="oneRadio">one</label>
              <input type="radio" id="twoRadio" value="two" v-model="singleRadio">
              <label for="twoRadio">two</label>
              <span> picked: {{ singleRadio }}</span>
            </div>

            <!-- 选择框，单选对应option值，多选对应数组 -->
            <!-- 如果v-model初始值不能匹配任何选项，select元素将被渲染为"未选中"状态，在ios中会因为无法触发change事件使用户无法选择 -->
            <div>
              <select v-model="singleSelect">
                <option disabled value="">请选择</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>
              <span>{{ singleSelect }}</span>
            </div>
            <div>
              <select multiple v-model="multiSelect" style="width: 50px;">
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>
              <span>{{ multiSelect }}</span>
            </div>

            <!-- 修饰符 lazy trim number -->
            <!-- v-model 转input事件为change事件 将输入框的值与数据进行绑定 -->
            <div>
              <label ref="inputLazy">lazy 输入:</label>
              <el-input id="inputLazy" type="text" v-model.lazy="inputLazy"></el-input><p>{{ inputLazy }}</p>
              <label ref="inputTrim">Trim 输入:</label>
              <el-input id="inputTrim" type="text" v-model.trim="inputTrim"></el-input><p>{{ inputTrim }}</p>
              <label ref="inputNumber">Number 输入:</label>
              <el-input id="inputNumber" type="number" v-model.number="inputNumber"></el-input><p>{{ inputNumber }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8"> <!-- 组件基础 -->
        <el-card>
          <div slot="header">
            <span>组件基础</span>
          </div>
          <div class="content">
            <!-- 一个组件的data选项必须是一个函数，每个实例维护一份被返回对象的独立的拷贝 -->
            <!--
              组件有两种注册类型：全局注册和局部注册
              全局注册：Vue.component('component-name', { ...options })
              局部注册：es2015 模块，import component
             -->
            <!--
              通过prop向子组件传递数据：一个组件可以拥有任意数量和类型的prop
            -->
            <!-- 每个组件必须只有一个根元素 -->
            <!--
              监听子组件事件：
              子组件可以调用内建的 $emit 方法触发父级的一个事件
            -->
            <!-- 在组件上使用 v-model 等价于-->
            <input v-model="inputValue">
            <input :value="inputValue" @input="inputValue = $event.target.value">

            <!-- 用在组件上，v-model等价于 -->
            <custom-input v-model="customValue"></custom-input>
            <custom-input
              :value="customValue"
              @input="customValue = $event"
            >
            </custom-input>
            <!-- 组件内部的定义
              Vue.component('custom-input', {
                props: ['value'],
                template: `
                  <input :value="value" @input="$emit('input', $event.target.value)"
                `
              })
            -->

            <!--
              通过插槽分发内容，父组件v-slot指令，子组件slot元素
              v-slot:slotName="slotScope"
              <slot name="slotName" :slotScope="slotScope"></slot>
            -->

            <!--
              动态组件：
              <component :is="currentDynamCompoennt"></component>

              有些html元素如ul ol table select对于能出现在其中是有严格限制的，
              如果直接放组件名在其中会被作为无效内容提升到外部，最终导致渲染结果出错
              因此将组件放在有效标签内，使用 is attribute作为变通方法
              <table>
                <tr is="blog-post-row"></tr>
              </table>
            -->

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BasicVue',
  data () {
    return {
      watchOutputData: '',

      isActive: true,
      hasError: false,
      activeClass: 'active',
      errorClass: 'text-danger',
      activeColor: 'red',
      fontSize: '14',
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      baseStyles: {
        color: 'blue',
        fontSize: '14px'
      },
      overridingStyles: {
        color: 'green',
        fontSize: '15px'
      },

      onceMsg: 'peace',
      someAttr: 'href',
      someattr: 'alt',
      value: 'alt',

      a: true,
      b: false,
      loginType: '',

      firstname: '',
      lastname: '',

      parentProperty: 'no.',
      arrItems: [
        {
          msg: 1
        },
        {
          msg: 2
        }
      ],
      objItems: {
        name: 'hong'
      },
      todos: [
        {
          msg: 123,
          isComplete: true
        },
        {
          msg: 456,
          isComplete: false
        }
      ],
      numbers: [1, 2, 3, 4],

      inputLazy: '',
      inputTrim: '',
      inputNumber: '',
      multiParagraph: '',
      singleCheckbox: true,
      multiCheckbox: [],
      singleRadio: 'one',
      singleSelect: '',
      multiSelect: [],

      inputValue: '',
      customValue: ''
    }
  },
  computed: {
    // 计算属性，基于响应式依赖进行缓存，只有在相关响应式依赖发生变化时它们才会重新求值

    // 描述：computed是计算属性，依赖其他属性值，computed的值有缓存，只有它依赖的属性值发生改变。
    // 下一次获取 computed 的值时从才会重新计算
    classObject () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    computed2 () {
      // computed2 的值不会发生改变
      return Date.now()
    },
    fullName: {
      get: function () {
        return `${this.firstname} ${this.lastName}`
      },
      set: function (newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },
    evenNumbers () {
      return this.numbers.filter(number => {
        return number % 2 === 0
      })
    }
    // 当需求是让一些数据随着其它数据变化而变化时
    // 可以计算合并这些依赖数据为一体，然后监听这个数据
  },
  watch: {
    // 侦听器可以响应数据变化，允许执行异步操作

    // watch 的值没有缓存性，更多是观察的作用，类似数据的监听回调
    // 每当监听的数据发生变化时都会执行回调进行后续操作
    fullName (newVal, oldVal) {
      this.watchOutputData = 'watchOutput: ' + newVal
    }
  },
  methods: {
    handleAvatarChange (e) {
      // if (e.target.files[0]) {
      //   this.dataLoading = true
      //   const form = new FormData()
      //   form.append('img', e.target.files[0])
      //   this.axios
      //     .post('/api/user/uploadIcon', form)
      //     .then(({ data }) => {
      //       this.avatarIcon = data.data
      //       this.$message.success('上传头像成功')
      //       this.uploadAvatar()
      //     })
      //     .finally(() => {
      //       this.dataLoading = false
      //     })
      // }
    },
    even (numbers) {
      return numbers.filter(item => {
        return item % 2 === 0
      })
    },
    greet (event) {
      this.$message.info(event.target.tagName)
    },
    warn (msg, event) {
      console.log(event)
      if (event) {
        event.preventDefault()
      }
      this.$message.info(msg + event.target.textContent)
    },
    passive (event) {
      console.log(event)
      this.$message.info('scrolling')
    },
    stopAll (event) {
      this.$message.info(event.target.textContent)
    },
    stopSelf (event) {
      this.$message.info(event.target.textContent)
    },
    onCtrlClick (event) {
      this.$message.info(event.target.textContent)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;

  .avatar-content {
    .avatar {
      background-color: chartreuse;
    }
    .avatar-hover {
      display: none;
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.1s ease-in-out;
      background: #0f0e0e9a;
      color: #fff;
      cursor: pointer;

      .avatar-upload {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        opacity: 0;
      }
      .el-icon-camera {
        position: relative;
        top: -35px;
      }
    }
    &:hover {
      .avatar-hover {
        display: block;
        transform: translateY(-55px);
      }
    }
  }
  .header-name {
    position: absolute;
    display: inline-block;
    white-space: nowrap;
    color: #303133;
    font-size: 14px;
    left: 60px;
    top: 14px;
  }
}
</style>
