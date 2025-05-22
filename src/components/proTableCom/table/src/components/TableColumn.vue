<template>
  <div>
    <template v-if="columnItem.slot || columnItem.render || columnItem.formatter">
      <el-table-column :type="columnItem.type" v-bind="{ ...columnItem, slot: null }">
        <!-- 递归多层表头 -->
        <!-- eslint-disable-next-line vue/no-v-for-template-key, vue/no-use-v-if-with-v-for,eslint-disable-next-line -->
        <template v-for="(childrenItem, index) of columnItem.children" v-if="columnItem.children">
          <table-column
            v-if="childrenItem.children"
            :key="parentKey !== '' ? `${parentKey}_${index}` : `${childrenItem.label}${index}`"
            :parent-key="`${childrenItem.label}${index}`"
            :column-item="childrenItem"
          >
            <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
              <slot :name="key" v-bind="scope"></slot>
            </template>
          </table-column>
          <!-- 末级children  -->
          <el-table-column
            v-else
            :key="parentKey !== '' ? `${parentKey}_${index + 1}` : `${childrenItem.label}${index + 1}`"
            :type="childrenItem.type"
            v-bind="{ ...childrenItem, slot: null }"
          >
            <template slot-scope="scope">
              <slot
                v-if="childrenItem.slot"
                :name="childrenItem.slot"
                :row="scope.row"
                :column="scope.column"
                :index="scope.$index"
              ></slot>
              <component
                :is="childrenItem.render(h, scope.row, scope.column, scope.$index)"
                v-if="childrenItem.render"
              />
              <template v-else-if="childrenItem.formatter">
                {{ childrenItem.formatter(scope.row, scope.column, scope.row[childrenItem.prop], scope.$index) }}
              </template>
            </template>
            <template v-if="childrenItem.header" #header>
              <component :is="childrenItem.header(h)" />
            </template>
          </el-table-column>
        </template>
        <!-- 非children -->
        <template v-if="!columnItem.children" slot-scope="scope">
          <slot
            v-if="columnItem.slot"
            :name="columnItem.slot"
            :row="scope.row"
            :column="scope.column"
            :index="scope.$index"
          ></slot>
          <component :is="columnItem.render(h, scope.row, scope.column, scope.$index)" v-if="columnItem.render" />
          <template v-else-if="columnItem.formatter">
            {{ columnItem.formatter(scope.row, scope.column, scope.row[columnItem.prop], scope.$index) }}
          </template>
        </template>
        <template v-if="!columnItem.children && columnItem.header" #header>
          <component :is="columnItem.header(h)" />
        </template>
      </el-table-column>
    </template>
    <!-- 无插槽、render、formatter情况下，避免占据默认插槽 -->
    <template v-else>
      <el-table-column :type="columnItem.type" v-bind="{ ...columnItem, slot: null }">
        <!-- 递归多层表头 -->
        <template v-for="(childrenItem, index) of columnItem.children" v-if="columnItem.children">
          <table-column
            v-if="childrenItem.children"
            :key="parentKey !== '' ? `${parentKey}_${index}` : `${childrenItem.label}${index}`"
            :parent-key="`${childrenItem.label}${index}`"
            :column-item="childrenItem"
          >
            <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
              <slot :name="key" v-bind="scope"></slot>
            </template>
          </table-column>
          <!-- 末级children  -->
          <el-table-column
            v-else
            :key="parentKey !== '' ? `${parentKey}_${index + 1}` : `${childrenItem.label}${index + 1}`"
            :type="childrenItem.type"
            v-bind="{ ...childrenItem, slot: null }"
          >
            <template v-if="childrenItem.header" #header>
              <component :is="childrenItem.header(h)" />
            </template>
          </el-table-column>
        </template>
        <!-- 非children -->
        <template v-if="!columnItem.children && columnItem.header" #header>
          <component :is="columnItem.header(h)" />
        </template>
      </el-table-column>
    </template>
  </div>
</template>

<script>
  import { Table as ElTable, Image as ElImage } from 'element-ui'
  export default {
    name: 'TableColumn',
    components: {
      ElTable,
      ElImage
    },
    props: {
      columnItem: {
        type: Object,
        default: null
      },
      parentKey: {
        type: String,
        default: ''
      }
    },
    mounted() {
      //   console.log('fff', this.columnItem)
    },
    methods: {
      isEmpty(value) {
        return value === null || value === undefined || value === ''
      },
      getnum(value) {
        console.log('dsdd', value)
      }
    }
  }
</script>
