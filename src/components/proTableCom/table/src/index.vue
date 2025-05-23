<template>
  <div style="position: relative">
    <el-table
      :key="columnsKey"
      ref="tableRef"
      :class="['jlc-table', { 'jlc-table--no-border': !cellRightBorder }]"
      v-bind="$attrs"
      tooltip-effect="light"
      :border="cellRightBorder"
      size="mini"
      v-on="$listeners"
    >
      <slot :handled-columns="handledColumns">
        <template v-for="(item, index) in handledColumns">
          <template v-if="item.slot || item.render || item.formatter">
            <el-table-column :key="index" :type="item.type" v-bind="{ ...item, slot: null }">
              <template slot-scope="scope">
                <slot
                  v-if="item.slot"
                  :name="item.slot"
                  :row="scope.row"
                  :column="scope.column"
                  :index="scope.$index"
                ></slot>
                <template v-else-if="item.formatter">
                  {{ item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index) }}
                </template>
              </template>
            </el-table-column>
          </template>

          <!-- 无插槽、render、formatter情况下，避免占据默认插槽 -->
          <el-table-column v-else :key="index" :type="item.type" v-bind="{ ...item, slot: null }"></el-table-column>
        </template>
      </slot>

      <template #empty>
        <div v-show="!loading">
          <div v-if="!error" class="table__state">
            <el-image :src="require('../assets/no-data.svg')" class="w-80 h-80"></el-image>
            <div>暂无数据</div>
          </div>
          <div v-else class="table__state">
            <i class="el-icon-circle-close state-icon"></i>
            <div>网络错误</div>
          </div>
        </div>
      </template>
    </el-table>

    <ListConfigCache
      v-if="customId"
      ref="ListConfigRef"
      class="jlc-table-setting"
      :default-columns="defaultColumns"
      :columns="columns"
      :custom-id="customId"
      @updateColumns="updateColumns"
    />
  </div>
</template>

<script>
  import '../style/index.scss'
  import { Table as ElTable, TableColumn as ElTableColumn, Image as ElImage } from 'element-ui'
  import { ListConfigCache, ListConfigCacheMixin } from '../../listConfigCache/index.js'

  // 预设type的表格列配置
  const typeConfigMap = {
    date: {
      width: 115,
      align: 'center'
    },
    time: {
      width: 174,
      align: 'center'
    }
  }
  export default {
    name: 'JlcTable',
    components: {
      ListConfigCache,
      ElTable,
      ElTableColumn,
      ElImage
    },
    mixins: [ListConfigCacheMixin],
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      cellRightBorder: {
        type: Boolean,
        default: false
      },
      customId: {
        type: String,
        default: ''
      }
    },
    computed: {
      defaultColumns() {
        const result = this.columns.map((item) => {
          const { type } = item
          return {
            ...item,
            // 根据type预设一些配置
            ...(type in typeConfigMap ? typeConfigMap[type] : {}),
            align: item.align || 'center',
            resizable: this.isEmpty(item.resizable) ? true : item.resizable,
            // 默认最小宽度，保证标题不会换行
            minWidth: this.isEmpty(item.minWidth) ? (item.label ? item.label.length * 15 + 24 : 20) : item.minWidth
          }
        })
        return result
      },
      handledColumns() {
        if (this.customId) {
          return this.columnsSetData?.length ? this.columnsSetData : this.defaultColumns
        }
        return this.defaultColumns
      },
      epTable() {
        return this.$refs.tableRef
      },
      clearSelection() {
        return this.$refs.tableRef.clearSelection
      },
      getSelectionRows() {
        return this.$refs.tableRef.getSelectionRows
      },
      toggleRowSelection() {
        return this.$refs.tableRef.toggleRowSelection
      },
      toggleAllSelection() {
        return this.$refs.tableRef.toggleAllSelection
      },
      toggleRowExpansion() {
        return this.$refs.tableRef.toggleRowExpansion
      },
      setCurrentRow() {
        return this.$refs.tableRef.setCurrentRow
      }
    },
    methods: {
      isEmpty(value) {
        return value === null || value === undefined || value === ''
      },
      getListConfigInstance() {
        return this.$refs.ListConfigRef
      },
      openListConfig() {
        this.$refs.ListConfigRef.onSet()
      }
    }
  }
</script>
