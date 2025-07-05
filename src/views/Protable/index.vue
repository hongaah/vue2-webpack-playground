<template>
  <div class="mainContent bg-white p-20">
    <pro-table
      ref="proTableRef"
      :filters="filters"
      :columns="columns"
      :get-data="getData"
      :filter-props="{
        bindForm: filterBindForm,
        expandFilterNums: 2
      }"
      :filter-events="filterEvents"
      :table-props="{
        'max-height': '600px',
        customId: 'protableTestOne',
        maxHeight: 500,
        cellRightBorder: true,
        scrollbarAlwaysOn: true
      }"
      :table-events="{
        'row-click': selectWhenClickingLine,
        'selection-change': onSelectionChange
      }"
    >
      <template #filter-button>
        <el-button size="small" type="primary">新增</el-button>
      </template>
      <template #businessType="{ row }">
        {{ row.businessType }}
      </template>
      <template #handleStatus="{ row }">
        <el-tag type="warning">
          {{ list.find((item) => item.value === row.handleStatus).label }}
        </el-tag>
      </template>
      <template #issueDesc="{ row }">
        <el-tooltip
          :disabled="!row.issueDesc || row.issueDesc.length < 16"
          effect="light"
          :content="row.issueDesc"
          placement="top"
        >
          <div class="line-overflow max-h-40 max-w-112">
            {{ row.issueDesc }}
          </div>
        </el-tooltip>
      </template>
      <template #customerExpectHandleCode="{ row }">
        <el-tooltip
          :disabled="!row.customerExpectHandleCode || row.customerExpectHandleCode.length < 12"
          effect="light"
          :content="row.customerExpectHandleCode"
          placement="top"
        >
          <div class="line-overflow max-h-40">
            {{ row.customerExpectHandleCode || '-' }}
          </div>
        </el-tooltip>
      </template>
      <template #customerActualHandleCode="{ row }">
        <el-tooltip
          :disabled="!row.customerActualHandleCode || row.customerActualHandleCode.length < 12"
          class="item"
          effect="light"
          :content="row.customerActualHandleCode"
          placement="top"
        >
          <div class="line-overflow max-h-[40px]">
            {{ row.customerActualHandleCode || '-' }}
          </div>
        </el-tooltip>
      </template>
    </pro-table>
  </div>
</template>

<script>
  import { ProTableCom as ProTable } from '@/components/proTableCom/protable'
  import dayjs from 'dayjs'
  import proTableSelectMixins from './proTableSelectMixins.js'

  export default {
    menuName: '查询表格分页组合',
    components: { ProTable },
    mixins: [proTableSelectMixins],
    data() {
      return {
        filterBindForm: {},
        filterEvents: {
          reset: (queryParams) => {
            console.log(queryParams)
            this.$refs.proTableRef.query()
          }
        },
        columns: [
          {
            label: '选择',
            type: 'selection',
            minWidth: 80
          },
          {
            label: '产品类型',
            slot: 'businessType',
            showOverflowTooltip: true,
            minWidth: 96
          },
          {
            label: '售后单号',
            prop: 'afterSalesCode',
            showOverflowTooltip: true,
            minWidth: 120
          },
          {
            label: '订单编号',
            prop: 'orderCode',
            showOverflowTooltip: true,
            minWidth: 120
          },
          {
            label: '申请时间',
            prop: 'applyTime',
            type: 'time',
            minWidth: 120
          },
          {
            label: '问题描述',
            prop: 'issueDesc',
            slot: 'issueDesc',
            minWidth: 152
          },
          {
            label: '期望处理方式',
            slot: 'customerExpectHandleCode',
            minWidth: 124
          },
          {
            label: '售后状态',
            slot: 'handleStatus',
            className: 'visible',
            minWidth: 135,
            renderHeader(h) {
              return h('div', { style: { color: '#ff9b00' } }, '售后状态')
            }
          }
        ],
        businessTypeList: [
          { value: 1, label: 'PCB' },
          { value: 2, label: '高多层PCB' },
          { value: 3, label: 'FPC软板' }
        ],
        list: [
          { value: 0, label: '等待处理' },
          { value: 4, label: '等待您的回复' },
          { value: 1, label: '正在处理' }
        ]
      }
    },
    computed: {
      filters() {
        return [
          {
            label: '产品类型',
            component: 'el-select',
            key: 'businessType',
            value: '',
            children: this.businessTypeList.map((item) => ({
              component: 'el-option',
              attrs: item
            })),
            attrs: {
              placeholder: '请选择产品类型'
            }
          },
          {
            label: '',
            component: 'el-input',
            key: 'codeKeyWord',
            value: '',
            attrs: {
              placeholder: '请输入订单编号/售后单号',
              prefixIcon: 'el-icon-search'
            }
          },
          {
            label: '申请日期',
            component: 'el-date-picker',
            key: 'applyStartTime',
            nextKey: 'applyEndTime',
            value: [dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss')],
            attrs: {
              type: 'daterange',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期'
            }
          },
          this.filterBindForm.businessType === this.businessTypeList[0].value
            ? {
                label: '售后状态',
                component: 'el-select',
                key: 'handleStatus',
                value: '',
                children: this.list.map((item) => ({
                  component: 'el-option',
                  attrs: item
                })),
                attrs: {
                  placeholder: '售后状态'
                }
              }
            : null
        ].filter(Boolean)
      }
    },
    mounted() {
      this.$refs.proTableRef.$refs.filterRef.bindForm.businessType = 1
    },
    methods: {
      getData(queryParams, proTableQueryType) {
        console.log('查询参数---', queryParams)
        console.log('查询类型---', proTableQueryType)
        console.log('this.filterBindForm.businessType', this.filterBindForm)

        const res = {
          success: true,
          code: 200,
          message: null,
          data: {
            data: [
              {
                businessType: 'PCB',
                handleStatus: 0,
                issueDesc: '测试',
                customerExpectHandleCode: '退款',
                customerActualHandleCode: null,
                salesNewMessage: 2,
                afterSalesAccessId: '133916080902606850',
                afterSalesCode: 'SHR44R6Z',
                orderCode: 'Y11626',
                applyTime: '2023-01-05 22:35:42'
              }
            ],
            pageNum: 1,
            pageSize: 10,
            totalPages: 8,
            totalRows: 78
          }
        }
        return { list: res.data.data || [], total: res.data.totalRows || 0 }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mainContent ::v-deep .jlc-table.el-table .el-table-column--selection .cell,
  .jlc-table.el-table td .cell {
    padding-right: 0 !important;
  }
</style>

