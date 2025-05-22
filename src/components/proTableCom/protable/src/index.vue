<template>
  <layout>
    <template #filter>
      <filter-com
        ref="filterRef"
        v-bind="filterProps"
        :filters="filters"
        v-on="filterEvents"
        @query="onFilterQuery"
        @reset="onFilterReset"
      >
        <template v-for="slot in filterSlots" #[slot]="{ bindForm }">
          <slot :name="slot" :bind-form="bindForm" />
        </template>
        <template #filter-button>
          <slot name="filter-button"></slot>
        </template>
      </filter-com>
    </template>
    <template #filter-bottom>
      <slot name="filter-bottom"></slot>
    </template>
    <template #list>
      <table-com
        ref="tableRef"
        v-bind="tableProps"
        v-loading="loading"
        :columns="columns"
        :data="data"
        :error="error"
        v-on="withCommonTableEvents"
        @query="onTableQuery"
      >
        <template #default="slotScope">
          <slot name="table" v-bind="slotScope"></slot>
        </template>
        <template v-for="slot in tableSlots" #[slot]="{ row, column, index }">
          <slot :name="slot" :row="row" :column="column" :index="index"></slot>
        </template>
      </table-com>
    </template>
    <template #table-bottom>
      <slot name="table-bottom"></slot>
    </template>
    <template v-if="isPage" #page>
      <page-com
        v-show="showPage"
        ref="pageRef"
        v-bind="pageProps"
        :total="total"
        v-on="pageEvents"
        @query="onPageQuery"
      />
    </template>
  </layout>
</template>

<script>
  import { getOptionSlots, getEpTableCommonEvents } from '../constants/ep-table-common'
  import { DEFAULT_PAGE_SIZE } from '../constants'
  import FilterCom from '../../filter'
  import TableCom from '../../table'
  import PageCom from '../../page'
  import Layout from '../layout/index.vue'

  export default {
    name: 'ProTable',
    components: { FilterCom, TableCom, PageCom, Layout },
    props: {
      filters: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      getData: Function,
      initGet: {
        type: Boolean,
        default: true
      },
      isPage: {
        type: Boolean,
        default: true
      },
      filterProps: {
        type: Object,
        default: () => ({})
      },
      filterEvents: {
        type: Object,
        default: () => ({})
      },
      tableProps: {
        type: Object,
        default: () => ({})
      },
      tableEvents: {
        type: Object,
        default: () => ({})
      },
      pageProps: {
        type: Object,
        default: () => ({})
      },
      pageEvents: {
        type: Object,
        default: () => ({})
      },
      queryCheck: Function,
      // 条数小于多少时隐藏页面
      hidePageWhenLessThan: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        tableParams: {},
        total: 0,
        data: [],
        loading: false,
        error: false,
        filterParams: {},
        pageParams: {},
        proTableQueryType: ''
      }
    },
    computed: {
      queryParams() {
        const pageInfo = {
          pageNum: 1,
          pageSize: DEFAULT_PAGE_SIZE,
          ...this.pageParams
        }
        const result = {
          ...this.filterParams,
          ...this.tableParams
        }
        if (this.isPage) {
          Object.assign(result, pageInfo)
        }
        return result
      },
      filterSlots() {
        return getOptionSlots(this.filters)
      },
      tableSlots() {
        return getOptionSlots(this.columns)
      },
      withCommonTableEvents() {
        return Object.assign({}, this.tableEvents, getEpTableCommonEvents(this.$listeners))
      },
      filter() {
        return this.$refs.filterRef
      },
      table() {
        return this.$refs.tableRef
      },
      page() {
        return this.$refs.pageRef
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
      },
      showPage() {
        // 无hidePageWhenLessThan，则一直显示
        if (!this.hidePageWhenLessThan) {
          return true
        }
        // 还没有执行查询时
        if (!this.pageParams.pageSize === undefined) {
          return false
        }
        // 总条数大于配置才显示分页器
        return this.total > this.hidePageWhenLessThan
      }
    },
    mounted() {
      if (this.initGet) {
        this.query()
      }
    },
    methods: {
      onFilterQuery(params, queryNow) {
        this.filterParams = params || {}
        // 校验查询条件是否满足的钩子
        if (this.queryCheck) {
          queryNow = this.queryCheck(params)
        }
        if (this.$refs.pageRef) {
          this.$refs.pageRef.reset(false)
        }
        this.proTableQueryType = 'filterQuery'
        queryNow && this.queryData()
      },
      onFilterReset(params) {
        this.proTableQueryType = 'filterReset'
        this.filterParams = params || {}
      },
      onTableQuery(params, queryNow) {
        this.proTableQueryType = 'tableQuery'
        this.tableParams = params || {}
        queryNow && this.queryData()
      },
      onPageQuery(params, queryNow) {
        this.proTableQueryType = 'pageQuery'

        this.pageParams = params || {}
        queryNow && this.queryData()
      },

      refresh(resetPage = false) {
        if (resetPage && this.$refs.pageRef) {
          this.$refs.pageRef.reset(false)
        }
        this.query()
      },

      resetFilter(queryNow = true) {
        this.$refs.filterRef.reset(queryNow)
      },

      resetPage(queryNow = true) {
        this.$refs.pageRef.reset(queryNow)
      },

      query() {
        if (this.$refs.filterRef) {
          this.filterParams = this.$refs.filterRef.getFilterParams() || {}
        }
        if (this.$refs.pageRef) {
          this.pageParams = this.$refs.pageRef.getPageParams() || {}
        }
        this.queryData()
      },

      queryData() {
        if (!this.getData) return

        const retValue = this.getData(this.queryParams,this.proTableQueryType)
        if (retValue instanceof Promise) {
          this.loading = true
          this.handleQuery(retValue)
        } else {
          this.handleQueryData(retValue)
        }

        this.$emit('get-data', retValue)
      },

      handleQuery(promise) {
        if (this.queryTaskCount === undefined) {
          this.queryTaskCount = 0
        }
        this.queryTaskCount++
        promise
          .then(
            (res) => {
              this.handleQueryData(res)
            },
            () => {
              if (this.queryTaskCount <= 1) {
                this.data = []
                this.error = true
                this.total = 0
              }
            }
          )
          .finally(() => {
            if (this.queryTaskCount <= 1) {
              this.loading = false
            }
            this.queryTaskCount--
          })
      },

      handleQueryData(queryData) {
        const throwErr = () => {
          const errMsg = `
        [jlc-table] getData接收到的数据结构有误，要求如下：

          {
            list: array, // 列表数据
            total: number, // 总条数
          }
        `
          throw new Error(errMsg)
        }
        if (typeof queryData !== 'object' || !Array.isArray(queryData.list) || typeof queryData.total !== 'number') {
          throwErr()
        }
        this.data = queryData.list
        this.total = queryData.total || 0
        this.error = false
        this.$emit('got-data', queryData)
      }
    }
  }
</script>
