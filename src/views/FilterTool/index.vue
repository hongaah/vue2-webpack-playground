<template>
  <div class="bgfff mainContent">
    <FilterToolCom
      ref="screenEle"
      :config-info="screenConfigData"
      :form-more="false"
      form-label-width="auto"
      @screeningSubmit="screeningChange"
    >
      <template slot="batchNameList">
        <el-select v-model="batchNameList" placeholder="选择批次" clearable filterable multiple collapse-tags>
          <el-option v-for="item in batchSelectList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </FilterToolCom>
    <div ref="functionalGroups">
      <el-form :inline="false" size="mini" label-position="left" label-width="100px" class="over demo-form-inline">
        <span class="font14">常用功能：</span>
        <el-button style="margin-bottom: 10px" size="mini" type="primary" @click="changeRemark">修改备注</el-button>
      </el-form>
    </div>
    <div class="text-center thBg thMin">
      <el-table
        ref="multipleTable"
        :data="currentPageListDataArray"
        :max-height="tableHeight"
        size="mini"
        highlight-current-row
        border
        style="width: 100%"
        @current-change="handleTableChange"
      >
        <el-table-column label="选择" prop="" width="80px" show-overflow-tooltip>
          <template #default="scope">
            <el-radio v-model="activeItem.checkDataInfoAccessId" :label="scope.row.checkDataInfoAccessId">
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="creatTime" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="dbUpdateTime" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="源系统的数据" prop="sourceData" min-width="120px"></el-table-column>
        <el-table-column label="核对结果" prop="compareResultStr" min-width="80px"></el-table-column>
        <el-table-column label="核对业务开始时间" prop="businessBeginTime" min-width="120px"></el-table-column>
        <el-table-column label="核对业务结束时间" prop="businessEndTime" min-width="120px"></el-table-column>
        <el-table-column label="异常原因" prop="errorInfo" min-width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="补偿次数" prop="compensateFrequency" min-width="80px"></el-table-column>
        <el-table-column label="源系统名称" prop="sourceSysName" min-width="120px"></el-table-column>
        <el-table-column label="目标系统名称" prop="targetSysName" min-width="120px"></el-table-column>
        <el-table-column label="操作" prop="" min-width="60px" show-overflow-tooltip>
          <template #default="scope">
            <el-button type="text" @click="showDetail(scope.row)">重新核对</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        ref="elpagination"
        :total="pageTotal"
        :current-page="pageIndex"
        :page-sizes="pageSizeOptions"
        :page-size="pageSize"
        class="mt10"
        layout="prev, pager, next, jumper, sizes, total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import FilterToolCom from '@/components/FilterToolCom/index.vue'
  import dayjs from 'dayjs'
  import tableMixins from './tableMixins.js'
  import { mockData } from './mock'

  export default {
    components: { FilterToolCom },
    mixins: [tableMixins],
    data() {
      return {
        dataCheckSelectOption: {},
        tableHeight: 3000,
        currentPageListDataArray: [],
        activeItem: {
          checkDataInfoAccessId: null
        },
        requestValue: {
          remark: null
        },
        checkDataInfo: null,
        showCostBusiness: [{ value: 1, label: '显示子项物料明细' }],
        batchNameList: [], //批次名称
        batchSelectList: [
          {
            label: '条数',
            value: '条数'
          },
          {
            label: '费用',
            value: '费用'
          },
          {
            label: '数量',
            value: '数量'
          },
          {
            label: '详情',
            value: '详情'
          }
        ]
      }
    },
    mounted() {
      Promise.all([
        async () => ({
          compareModule: [],
          billType: [],
          businessType: []
        })
      ]).then((res) => {
        this.dataCheckSelectOption = res[0]
        this.screenConfigData = this.setScreenConfig()
        this.$nextTick(() => {
          this.getQueryParams()
          this.$refs.screenEle.onSubmit()
        })
      })
    },
    methods: {
      getQueryParams() {
        if (this.$route.query.businessDate) {
          this.$refs.screenEle.setScreenValue('compareResult', 0)
          this.screenConfigData[0].screenValue = [
            this.$route.query.businessDate,
            this.$route.query.businessDate.split(' ')[0] + ' 23:59:59'
          ]
        }
        this.screenConfigData = this.setScreenConfig()
        console.log(this.$refs.screenEle.getCurrentScreenfilterData())
      },
      changeRemark() {
        if (!this.activeItem.checkDataInfoAccessId) {
          return this.$notify({
            title: '提示',
            message: '请选择一条数据进行操作',
            type: 'warning'
          })
        }
      },
      showDetail() {
        return this.$notify({
          title: '提示',
          message: '暂未开发',
          type: 'warning'
        })
      },
      handleTableChange(val) {
        if (val) {
          this.activeItem = val //选中item
        }
      },
      setScreenConfig() {
        return [
          {
            modelType: 'daterange',
            screenLabel: '核对业务时间',
            screenFormat: 'yyyy-MM-dd HH:mm:ss',
            screenItem: [
              { label: '开始时间', screenType: 'businessBeginTime' },
              { label: '结束时间', screenType: 'businessEndTime' }
            ],
            screenValue: [dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'), new Date()],
            clearable: true
          },
          {
            modelType: 'select',
            screenLabel: '比较维度',
            screenType: 'compareDimension',
            screenItem: this.batchSelectList,
            screenValue: null,
            clearable: true
          },
          {
            modelType: 'selectMultiple',
            screenLabel: '模块',
            screenType: 'compareModules',
            screenItem: this.dataCheckSelectOption.compareModule,
            screenValue: null,
            clearable: true,
            collapseTags: true,
            handleOnChange: this.changeCompareModules
          },
          {
            modelType: 'text',
            screenLabel: '备注',
            screenType: 'remark',
            screenValue: null,
            clearable: true
          },
          {
            modelType: 'number',
            screenLabel: '成本单价范围',
            placeholder: '最小值',
            screenType: 'minCost',
            screenValue: undefined
          },
          // {
          //   modelType: 'numberrange',
          //   screenLabel: '参数1',
          //   screenType: 'param1',
          //   screenValue: null,
          //   clearable: true
          // },
          // {
          //   modelType: 'datetimerange',
          //   screenLabel: '参数2',
          //   screenType: 'param2',
          //   screenValue: null,
          //   clearable: true
          // },
          {
            modelType: 'date',
            screenLabel: '业务日期',
            screenType: 'period',
            screenValue: '2021-12',
            screenFormat: 'yyyy-MM',
            type: 'month',
            clearable: true
          },
          {
            modelType: 'month',
            screenLabel: '会计期间',
            screenType: 'accountingPeriod',
            screenValue: null,
            clearable: false
          },
          {
            modelType: 'year',
            screenLabel: '会计年度',
            screenType: 'financialYear',
            screenValue: new Date().getFullYear() + '',
            clearable: false
          },
          {
            modelType: 'selectMultipleAndMore',
            screenLabel: '物料编码',
            screenType: 'materielKeyIdList',
            screenValue: null,
            clearable: true,
            system: 'billSys',
            queryType: 'financeBasicCode'
          },
          {
            modelType: 'radio',
            screenLabel: '',
            screenType: 'isShowCostBusiness',
            screenValue: null,
            screenItem: this.showCostBusiness
          },
          // {
          //   modelType: 'checkbox',
          //   screenLabel: '参数3',
          //   screenType: 'param3',
          //   screenValue: null,
          //   clearable: true
          // },
          // {
          //   modelType: 'checkboxButton',
          //   screenLabel: '参数4',
          //   screenType: 'param4',
          //   screenValue: null,
          //   clearable: true
          // },
          {
            modelType: 'cascader',
            screenLabel: '成本中心',
            screenType: 'costCenterCode',
            screenItem: [],
            screenValue: [],
            screenOptionSize: 'mini',
            multiple: false,
            emitPath: false,
            // screenWidth: 40,
            collapse: true,
            noformCache: true
          },
          {
            modelType: 'slot',
            screenLabel: '批次名称',
            screenType: 'batchNameList',
            screenValue: '',
            clearable: true,
            filterable: true
          }
        ]
      },
      fitTableHeight(that, subHeight) {
        that.$nextTick(function () {
          let tableHeight = window.innerHeight - subHeight - 65
          tableHeight = tableHeight < 400 ? 3000 : tableHeight

          that.tableHeight = tableHeight

          // 监听窗口大小变化
          let self = that
          window.onresize = function () {
            self.tableHeight = tableHeight
          }
        })
        //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
        //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
      },
      /*列表数据--初始化数据*/
      requestListData() {
        // const requestValue = {
        //   pageNum: this.pageIndex,
        //   pageSize: this.pageSize
        // }
        // 判断是否勾选全部
        let compareModules
        compareModules = this.currentPageScreenData.compareModules

        if (compareModules && compareModules.includes(null)) {
          compareModules = []
        }

        const response = mockData
        if (response.code === 200) {
          this.currentPageListDataArray = response.data.dataList
          this.pageTotal = response.data.totalRows

          // 设置表格高度
          const subHeight = this.$refs.screenEle.$el.offsetHeight
          this.fitTableHeight(this, subHeight)
        } else {
          this.$notify({
            title: '失败',
            message: response.message,
            type: 'error'
          })
        }
      },
      changeCompareModules(val) {
        if (val[val.length - 1] === null) {
          val = [null]
          this.$refs.screenEle.setScreenValue('compareModules', [null])
        } else {
          val = val.filter(Boolean)
          this.$refs.screenEle.setScreenValue('compareModules', val)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .bgfff {
    background-color: #fff;
  }

  .mainContent {
    padding: 10px;
    height: 100%;
    overflow: auto;
  }
</style>