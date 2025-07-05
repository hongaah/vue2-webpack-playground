<template>
  <div>
    <div v-if="customId" @click="onSet">
      <i style="font-size: 16px" class="el-icon-setting block"></i>
      <slot></slot>
    </div>

    <el-dialog
      title="列表页字段设置"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="900px"
      :visible.sync="dialogVisible"
      modal-append-to-body
      append-to-body
      @close="onClose"
    >
      <div v-loading="pageData.loading">
        <div style="margin-bottom: 10px; font-size: 16px">
          共
          <span style="color: #f87171; font-weight: semibold; font-size: 18px">{{ defaultColumns?.length }}</span>
          个字段，已设置显示
          <span style="color: #f87171; font-weight: semibold; font-size: 18px">{{ showNum }}</span>
          个字段
        </div>
        <table-com
          ref="tableRef"
          :columns="tableColumns"
          :data="pageData.tableData"
          :max-height="400"
          :border="true"
          size="mini"
        >
          <template #showFlag="{ row }">
            <el-switch v-model="row.showFlag" checked-info="开" unchecked-info="关" :disabled="false"></el-switch>
          </template>
          <template #leftFlag="{ row }">
            <el-switch
              v-model="row.leftFlag"
              checked-info="开"
              unchecked-info="关"
              :disabled="false"
              @change="
                (val) => {
                  changeFixedFlag(val, row, 'leftFlag')
                }
              "
            ></el-switch>
          </template>
          <template #rightFlag="{ row }">
            <el-switch
              v-model="row.rightFlag"
              checked-info="开"
              unchecked-info="关"
              :disabled="false"
              @change="
                (val) => {
                  changeFixedFlag(val, row, 'rightFlag')
                }
              "
            ></el-switch>
          </template>

          <template #columnWidth="{ row }">
            <el-input
              v-model="row.columnWidth"
              size="mini"
              @input="
                (val) => {
                  checkColumnWidth(val, row, 'columnWidth')
                }
              "
            ></el-input>
          </template>
          <template #minWidth="{ row }">
            <el-input
              v-model="row.minWidth"
              size="mini"
              @input="
                (val) => {
                  checkColumnWidth(val, row, 'minWidth')
                }
              "
            ></el-input>
          </template>

          <template #operate="{ row, index }">
            <div class="list-config-cache">
              <el-link
                :disabled="getDisabledStatus('up', row, index)"
                :underline="false"
                type="primary"
                style="margin-right: 20px"
                @click="onMoveUp(index)"
              >
                <i class="el-icon-top"></i>
                上移
              </el-link>
              <el-link
                :underline="false"
                type="primary"
                style="margin-right: 20px"
                :disabled="getDisabledStatus('down', row, index)"
                @click="onMoveDown(index)"
              >
                <i class="el-icon-bottom"></i>
                下移
              </el-link>
              <el-link
                :disabled="getDisabledStatus('top', row, index)"
                :underline="false"
                style="margin-right: 20px"
                type="primary"
                @click="onMoveTop(row, index)"
              >
                <i class="el-icon-upload2"></i>
                置顶
              </el-link>
              <el-link
                :underline="false"
                type="primary"
                :disabled="getDisabledStatus('bottom', row, index)"
                @click="onMoveBottom(row, index)"
              >
                <i class="el-icon-download"></i>
                <span>置底</span>
              </el-link>
            </div>
          </template>
        </table-com>

        <div>
          <div style="display: flex; justify-content: end">
            <span style="color: #e6a23c; margin: 10px 0 10px 0">
              该设置缓存在浏览器中，更换或重新清除缓存后需重新设置
            </span>
            <!-- <span style="color: #e6a23c; margin: 10px 0">注:保存后将重新刷新列表</span> -->
          </div>

          <div style="display: flex; justify-content: end">
            <el-button size="small" @click="onCancel">取消</el-button>
            <el-button type="info" size="small" @click="onReset">重置</el-button>
            <el-button type="primary" size="small" @click="onSave">保存</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import '../style/index.scss'
  import { Message } from 'element-ui'
  import cache from '../../utils/cache'
  import { cloneDeep } from 'lodash-es'

  const customIdKey = 'ListConfigCache'

  const isEmpty = (value) => {
    return value === null || value === undefined || value === ''
  }

  export default {
    name: 'ListConfigCache',
    components: {
      TableCom: () => import('../../table'),
    },
    props: {
      defaultColumns: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      customId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        pageData: {
          loading: false,
          tableData: []
        },
        dialogVisible: false,
        tableColumns: [
          { label: '字段名称', prop: 'fieldName', minWidth: 90 },
          { label: '是否显示', slot: 'showFlag', minWidth: 90 },
          { label: '固定在左侧', slot: 'leftFlag', minWidth: 90 },
          { label: '固定在右侧', slot: 'rightFlag', minWidth: 90 },
          // { label: '列宽', slot: 'columnWidth', minWidth: 90 },
          // { label: '最小列宽', slot: 'minWidth', minWidth: 90 },
          { label: '显示顺序设置', slot: 'operate', width: 290 }
        ]
      }
    },
    computed: {
      showNum() {
        let count = 0

        // 遍历数组，统计满足条件的元素个数
        this.pageData.tableData?.forEach(function (item) {
          if (item.showFlag) {
            count++
          }
        })

        return count
      }
    },
    watch: {
      columns: {
        handler(newValue) {
          if (this.pageData.tableData?.length === 0) {
            this.pageData.tableData = this.columnsToConfigData(newValue)
          }
        },
        deep: true
      }
    },
    methods: {
      // 获取禁用状态
      getDisabledStatus(type, row, rowIndex) {
        let disabledStatus = false

        const leftNum = this.pageData.tableData.filter((item) => item.leftFlag === true).length
        const middleNum = this.pageData.tableData.filter((item) => !item.rightFlag && !item.leftFlag).length
        const rightNum = this.pageData.tableData.filter((item) => item.rightFlag === true).length

        if (['up', 'top'].includes(type) && rowIndex === 0) {
          disabledStatus = true
        }

        if (['down', 'bottom'].includes(type) && rowIndex === this.pageData.tableData?.length - 1) {
          disabledStatus = true
        }

        // 固定在右边的 不能置顶和移动到中间区域
        if (row.rightFlag) {
          if (['top'].includes(type)) {
            disabledStatus = true
          }

          if (['up'].includes(type) && leftNum + middleNum === rowIndex) {
            disabledStatus = true
          }
        }

        // 固定在左边的 不能置底和移动到中间区域
        if (row.leftFlag) {
          if (['bottom'].includes(type)) {
            disabledStatus = true
          }

          if (['down'].includes(type) && leftNum === rowIndex + 1) {
            disabledStatus = true
          }
        }

        if (!row.leftFlag || !row.rightFlag) {
          if (leftNum > 0 && ['top'].includes(type)) {
            // disabledStatus = true
          }
          if (rightNum > 0 && ['bottom'].includes(type)) {
            // disabledStatus = true
          }

          if (leftNum === rowIndex && ['up', 'top'].includes(type)) {
            disabledStatus = true
          }
          if (leftNum + middleNum === rowIndex + 1 && ['down', 'bottom'].includes(type)) {
            disabledStatus = true
          }
        }

        return disabledStatus
      },

      checkColumnWidth(val, row, field) {
        const checkStatus = val.match(/\d+/)

        if (field === 'columnWidth') {
          row['minWidth'] = null
        } else {
          row['columnWidth'] = null
        }

        if (checkStatus) {
          row[field] = val.match(/\d+/)[0]
        } else {
          row[field] = null
        }
      },

      changeFixedFlag(val, row, field) {
        const contraryField = field === 'leftFlag' ? 'rightFlag' : 'leftFlag'

        if (val) {
          const extantNum = this.pageData.tableData.filter((item) => item[field] === true).length
          if (extantNum > 3) {
            this.$nextTick(() => {
              row[field] = false
            })
            return Message.warning(`最多只能固定 3 列在${field === 'leftFlag' ? '左侧' : '右侧'}`)
          }

          row[contraryField] = false
        }

        this.sortByFixed()
      },

      sortByFixed() {
        this.$nextTick(() => {
          this.pageData.tableData.sort((a, b) => {
            if (a.leftFlag === true && b.leftFlag === false) {
              return -1 // a 在前
            }
            if (a.leftFlag === false && b.leftFlag === true) {
              return 1 // b 在前
            }
            if (a.rightFlag === true && b.rightFlag === false) {
              return 1 // b 在前
            }
            if (a.rightFlag === false && b.rightFlag === true) {
              return -1 // a 在前
            }
            return 0 // 保持原顺序
          })
        })
      },

      onCancel() {
        this.pageData.tableData = []
        this.dialogVisible = false
      },
      onReset() {
        this.pageData.tableData = this.columnsToConfigData(this.defaultColumns)
      },
      async onSave() {
        const existShowFlag = this.pageData.tableData.some((item) => item.showFlag)

        if (!existShowFlag) {
          return Message.warning('至少要选择一个字段显示')
        }

        const menuOrderDetailForms = this.pageData.tableData.map((item, index) => {
          return {
            ...item,
            fieldName: item.fieldName,
            showFlag: item.showFlag,
            leftFlag: item.leftFlag,
            rightFlag: item.rightFlag,
            width: item.columnWidth,
            minWidth: item.minWidth,
            showOrder: item.showOrder,
            fieldSequence: index
          }
        })
        const changedConfig = this.processedConfigData(menuOrderDetailForms)
        this.setConfigCache(this.customId, changedConfig)

        const columnsData = await this.configDataToColumns(this.pageData.tableData)
        // 将排序后的结果复制回原始数组1
        this.$emit('updateColumns', columnsData)
        this.dialogVisible = false
      },

      setConfigCache(customId, data) {
        const oldConfigList = cache.getLocal(customIdKey) || {}
        const configList = {
          ...oldConfigList,
          [customId]: {
            customId: customId,
            menuOrderDetailForms: data
          }
        }
        cache.setLocal(customIdKey, configList)
      },

      /**
       * 移动数组中的元素。
       *
       * 此函数用于在数组中移动一个元素从一个位置到另一个位置。这可以在不需要复制元素的情况下重新排列数组。
       *
       * @param {any[]} arr - 要操作的数组，可以包含任何类型的元素。
       * @param {number} fromIndex - 元素当前的索引位置。
       * @param {number} toIndex - 元素要移动到的目标索引位置。
       */
      moveArrayElement(arr, fromIndex, toIndex) {
        // 从数组中移除指定的元素
        const element = arr.splice(fromIndex, 1)[0]
        // 在指定的下标位置插入元素
        arr.splice(toIndex, 0, element)

        return arr
      },

      /**
       * 交换数组中两个元素的位置。
       *
       * 此函数接受一个数组和两个索引作为参数，用于交换数组中指定索引位置的元素。
       *
       * @param {any} myArray - 要操作的数组，可以是任何类型的数组。
       * @param {number} index1 - 第一个要交换的元素的索引。
       * @param {number} index2 - 第二个要交换的元素的索引。
       */
      swapElements(myArray, index1, index2) {
        myArray[index1] = myArray.splice(index2, 1, myArray[index1])[0]
      },

      onMoveUp(index) {
        this.swapElements(this.pageData.tableData, index - 1, index)
      },
      onMoveDown(index) {
        this.swapElements(this.pageData.tableData, index + 1, index)
      },
      onMoveTop(row, index) {
        // pageData.tableData.splice(index, 1) // 从原位置移除元素
        // pageData.tableData.unshift(row)

        const leftNum = this.pageData.tableData.filter((item) => item.leftFlag === true).length

        if (index > 0) {
          const list = this.pageData.tableData
          const [item] = list.splice(index, 1)
          if (index > leftNum) {
            //中间区域,只置顶到中间区域的第一条
            list.splice(leftNum, 0, item)
          } else {
            list.unshift(item)
          }
          // sortByFixed()
        }
      },
      onMoveBottom(row, index) {
        // pageData.tableData.splice(index, 1) // 从原位置移除元素
        // pageData.tableData.push(row)

        const rightNum = this.pageData.tableData.filter((item) => item.rightFlag === true).length

        if (index !== this.pageData.tableData.length - 1) {
          const list = this.pageData.tableData
          const [item] = list.splice(index, 1)
          if (index > rightNum) {
            //中间区域,只置顶到中间区域的第一条
            list.splice(this.pageData.tableData.length - rightNum, 0, item)
          } else {
            list.push(item)
          }
          // sortByFixed()
        }
      },

      onClose() {
        this.dialogVisible = false
      },

      onSet() {
        this.dialogVisible = true
        this.getData()
      },

      async getData() {
        try {
          this.pageData.loading = true

          const allConfigData = cache.getLocal(customIdKey) || {}
          const configData = allConfigData[this.customId] || {}
          if (Object.keys(configData).length) {
            if (configData?.menuOrderDetailForms?.length > 0) {
              this.pageData.tableData = configData?.menuOrderDetailForms
              let innormalFlag = false
              for (const item of this.defaultColumns) {
                const findData = this.pageData.tableData.find((findItem) => findItem.fieldName === item.label)
                if (!findData) {
                  innormalFlag = true
                  break
                }
              }
              if (innormalFlag) {
                this.onReset()
                this.onSave()
              }
            } else {
              this.pageData.tableData = await this.columnsToConfigData(this.columns)
            }
            this.$nextTick(() => {
              this.sortByFixed()
            })
          } else {
            this.pageData.tableData = await this.columnsToConfigData(this.columns)
          }
          this.pageData.loading = false
        } catch (e) {
          if (!this.pageData.tableData || this.pageData.tableData?.length === 0) {
            this.pageData.tableData = await this.columnsToConfigData(this.columns)
          }
          this.pageData.loading = false
        }
      },

      /**
       * 将配置数据转换为列定义
       * @param configData
       * @returns {Array} 返回一个包含列定义的数组
       */
      async configDataToColumns(configData) {
        // 创建一个新数组来存储排序后的结果
        const sortedArray = []

        // 遍历数组2，按照数组2中的顺序排序数组1，并删除不存在于数组2中的对象
        configData.forEach((item) => {
          const findData = this.defaultColumns.find((findItem) => findItem.label === item.fieldName)
          if (findData && item.showFlag) {
            const newItem = {
              ...item,
              ...findData,
              width: isEmpty(item.columnWidth) || item.columnWidth === 0 ? null : item.columnWidth,
              minWidth: isEmpty(item.minWidth) || item.minWidth === 0 ? null : item.minWidth,
              fixed: item.leftFlag ? 'left' : item.rightFlag ? 'right' : null
            }

            sortedArray.push(newItem)
          }
        })

        return sortedArray
      },

      /**
       * 将列定义转换为配置数据
       *
       * @returns {Array} 返回一个包含列定义的数组
       */
      columnsToConfigData(columnsData) {
        console.log('columnsToConfigData', columnsData)
        if (columnsData?.length > 0) {
          return columnsData.map((item) => {
            return {
              ...item,
              columnWidth: item.width || null,
              minWidth: item.minWidth || null,
              fieldName: item.label,
              leftFlag: item?.fixed === 'left',
              rightFlag: item?.fixed === 'right',
              showFlag: true
            }
          })
        } else {
          return []
        }
      },

      /**
       * 所有数据加调整后的
       *
       */
      processedConfigData(columnsData) {
        const defaultConfigData = cloneDeep(this.columnsToConfigData(this.defaultColumns))

        const hiddenItemArray = defaultConfigData.filter((item) => {
          const findData = columnsData.find((findItem) => findItem.label === item.fieldName)
          return !findData
        })

        return columnsData.concat(hiddenItemArray)
      },

      async init() {
        await this.getData()
        const columns = await this.configDataToColumns(this.pageData.tableData)
        this.$emit('updateColumns', columns)
      }
    }
  }
</script>
