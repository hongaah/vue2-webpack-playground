<template>
  <el-form
    v-if="handledFilters.length"
    ref="formRef"
    :model="bindForm"
    v-bind="$attrs"
    size="small"
    inline
    class="filter__form"
    @submit.native.prevent
  >
    <div class="float-left">
      <template v-for="(item, index) in handledFilters">
        <el-form-item
          v-show="!expandFilterNums || expandNums > index"
          :key="index"
          :prop="item.key"
          :label="item.label"
          class="filter__form__item"
        >
          <!--     :class="{ last: index == handledFilters.length - 1 }" -->
          <!-- 插槽 -->
          <slot v-if="item.slot" :name="item.slot" :bind-form="bindForm" />
          <component
            :is="item.component"
            v-model="bindForm[item.key]"
            v-bind="item.attrs"
            class="w-full"
            v-on="item.events"
            @keydown.enter.native="onEnter(item)"
          >
            <!-- 子组件 -->
            <template v-if="item.children">
              <component
                :is="child.component"
                v-for="(child, index) in item.children"
                :key="index"
                v-bind="child.attrs"
                v-on="child.events"
              >
                <!-- 子组件内容render -->
                <component :is="child.render(bindForm)" v-if="child.render" />
                <!-- 子组件内容 -->
                <template v-else-if="child.content">{{ child.content }}</template>
              </component>
            </template>
            <!-- v-if不成立时，打包之后仍然会占据date-picker的默认插槽，以下临时处理方案 -->
            <template v-if="item.component === 'el-date-picker'" #default="{ text }">
              <div class="el-date-table-cell">
                <span class="el-date-table-cell__text">{{ text }}</span>
              </div>
            </template>
          </component>
        </el-form-item>
      </template>
      <div class="filter__ctrl inline-flex">
        <el-button v-if="showQueryBtn" type="primary" size="small" class="rounded-1 w-80" @click="query(true)">查询</el-button>
        <el-button v-if="showResetBtn" type="default" size="small" class="rounded-1 w-80" @click="reset(true)">重置</el-button>
        <el-button
          v-if="expandFilterNums"
          type="default"
          :style="{
            transform: handledFilters.length === expandNums ? 'rotate(-90deg)' : 'rotate(90deg)'
          }"
          round
          class="filter-expand-btn"
          @click="expand"
        >
          <el-icon :size="16" icon="doubleArrow" color="#899099" />
        </el-button>
        <slot name="filter-button"></slot>
      </div>
    </div>
  </el-form>
</template>

<script>
  import '../style/index.scss'
  import { Form as ElForm, FormItem as ElFormItem } from 'element-ui'
  import * as lodashEs from 'lodash-es'

  export default {
    name: 'Filter',
    components: {
      ElForm,
      ElFormItem,
    },
    props: {
      filters: {
        type: Array,
        default: () => []
      },
      columnCount: {
        type: Number,
        default: 5
      },
      beforeQuery: {
        type: Function,
        default: null
      },
      showResetBtn: {
        type: Boolean,
        default: true
      },
      showQueryBtn: {
        type: Boolean,
        default: true
      },
      // 默认值 0 表示展开全部；大于 0 则表示展开几个，开启展开收起功能
      expandFilterNums: {
        type: Number,
        default: 0
      },
      pickerOptions: {
        type: Object,
        default: () => ({
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        })
      }
    },
    data() {
      this.filtersMap = {}
      return {
        expandNums: this.expandFilterNums,
        bindForm: {}
      }
    },
    computed: {
      // 处理后的FilterList
      handledFilters() {
        let result = []
        this.filters.forEach((item) => {
          if (typeof item.key !== 'string' && !Array.isArray(item.key)) {
            throw new Error('[filter] 缺少属性或类型不正确：key')
          }
          // compose将handler集合串联执行，非常方便后续扩展和修改
          result = result.concat(this.compose(this.handleRangeTime, this.handleDefaultValue)(item))
        })
        return result
      },
      epForm() {
        return this.$refs.formRef
      }
    },
    watch: {
      handledFilters: {
        handler(filters) {
          if (!filters) return

          const oldKeys = new Set(Object.keys(this.filtersMap))

          filters.forEach((item) => {
            oldKeys.delete(item.key)

            // 添加新增的filter
            if (!this.filtersMap[item.key]) {
              this.filtersMap[item.key] = item
              this.bindForm[item.key] = lodashEs.cloneDeep(item.value)
            }
          })

          // 移除掉不存在的filter
          oldKeys.forEach((key) => {
            delete this.bindForm[key]
          })

          // 解决vue2对象动态添加属性不刷新界面问题
          this.bindForm = { ...this.bindForm }
        },
        immediate: true
      }
    },
    methods: {
      compose(...fns) {
        return fns.reduce(
          (a, b) =>
            (...args) =>
              a(b(...args))
        )
      },
      // 处理默认值
      handleDefaultValue(filterItem) {
        const defaultMap = {
          component: 'el-input',
          attrs: {
            clearable: true
          },
          events: {},
          flatTransform: true,
          enterQuery: true
        }
        if (filterItem.component == 'el-date-picker' && filterItem.attrs && filterItem.attrs.type == 'daterange') {
          defaultMap.attrs = {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '至',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            pickerOptions: this.pickerOptions,
            clearable: true
          }
        }
        if (filterItem.component == 'el-date-picker' && filterItem.attrs && filterItem.attrs.type == 'datetimerange') {
          defaultMap.attrs = {
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            rangeSeparator: '至',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            pickerOptions: this.pickerOptions,
            clearable: true
          }
        }
        const result = lodashEs.merge({}, defaultMap, filterItem)
        // 输入框提示默认为请输入
        if (result.component === 'el-input' && !result.attrs.placeholder) {
          result.attrs.placeholder = '请输入'
        }
        return result
      },

      // 处理范围时间类型的filter项
      handleRangeTime(filterItem) {
        const { label, key, type, value = [], transform } = filterItem
        if (type !== 'rangeTime') return filterItem
        if (!Array.isArray(key)) {
          throw new Error('[filter] 当type为rangeTime时，key必须传入一个数组: [key1, key2]')
        }
        const [startField, endField] = key
        const res = [
          {
            label,
            transform,
            component: 'el-date-picker',
            key: startField,
            value: value[0],
            attrs: {
              placeholder: '开始时间',
              type: 'datetime',
              disabledDate(date) {
                return new Date(date).getTime() > new Date(this.bindForm[endField]).getTime()
              }
            }
          },
          {
            label: '至',
            transform,
            component: 'el-date-picker',
            key: endField,
            value: value[1],
            attrs: {
              placeholder: '结束时间',
              type: 'datetime',
              disabledDate(date) {
                return new Date(date).getTime() < new Date(this.bindForm[startField]).getTime()
              }
            }
          }
        ]
        return res
      },

      // 获取绑定form转换后的值
      getFilterParams() {
        const result = {}
        Object.keys(this.filtersMap).forEach((key) => {
          if (!this.filtersMap[key]) return
          // 深度克隆初始值，避免影响原值
          const value = lodashEs.cloneDeep(this.bindForm[key])
          const { transform, flatTransform, trim, nextKey } = this.filtersMap[key]
          if (transform) {
            const transformVal = transform(value)
            // 将transform返回的对象拉平，赋值到result
            if (flatTransform && typeof transformVal === 'object') {
              Object.assign(result, transformVal)
            } else {
              result[key] = transformVal
            }
          } else if (trim && typeof value === 'string') {
            // 配置了trim且当前值类型为string，则执行trim
            result[key] = value.trim()
          } else if (Array.isArray(value) && nextKey) {
            result[key] = value[0]
            result[nextKey] = value[1]
          } else {
            result[key] = value
          }
        })
        return result
      },

      // 设置表单绑定值
      setBindValue(filter) {
        Object.assign(this.bindForm, filter)
      },

      // 初始化值
      handleInitValue() {
        this.handledFilters.forEach((item) => {
          const { key, value } = item
          this.bindForm[key] = lodashEs.cloneDeep(value)
        })
      },

      // 查询
      async query(queryNow = true) {
        const isQuery = this.beforeQuery ? await this.beforeQuery(this.bindForm) : true
        if (isQuery) {
          const transformValues = this.getFilterParams()
          this.$emit('query', transformValues, queryNow)
        }
      },

      // 重置
      reset(queryNow = true) {
        this.handleInitValue()
        const transformValues = this.getFilterParams()
        this.$emit('reset', transformValues, queryNow)
      },

      // 展开收起
      expand() {
        this.expandNums =
          this.expandNums === this.handledFilters.length ? this.expandFilterNums : this.handledFilters.length
      },

      // 监听回车
      onEnter(filterItem) {
        if (filterItem.enterQuery) {
          this.query()
        }
      }
    }
  }
</script>