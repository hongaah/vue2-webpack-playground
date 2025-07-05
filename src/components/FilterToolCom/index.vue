<template>
  <!--筛选查询-->
  <div class="screening_wrapper">
    <el-form
      :inline="true"
      :label-width="oFormLabelWidth || oFormLabelWidth !== 'auto' ? oFormLabelWidth + 'px' : ''"
      size="mini"
      class="screening_con"
      label-position="right"
    >
      <el-form-item
        v-for="(item, index) in configInfoData"
        v-show="
          item.modelType !== 'hidden' &&
          !item.visibility &&
          (!item.screenVisibility ||
            (item.screenVisibility &&
              item.screenVisibility.screenType &&
              item.screenVisibility.screenValue.indexOf(
                configInfoData[getScreenItemIndex(item.screenVisibility.screenType)].screenValue
              ) !== -1))
        "
        :key="index"
        :label="item.screenLabel"
        :style="item.width ? 'width:' + item.width : ''"
        :class="[
          { line_feed: JSON.stringify(item) == '{}' },
          formFlex
            ? item.screenWidth
              ? 'flex' + item.screenWidth
              : item.modelType === 'daterange' || item.modelType === 'datetimerange'
              ? 'flex' + parseInt(100 / formSpan) * 2
              : 'flex' + parseInt(100 / formSpan)
            : 'input170'
        ]"
      >
        <!--input text-->
        <div v-if="item.modelType === 'text'">
          <el-input
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model.trim="item.screenValue"
            :placeholder="item.placeholder"
            :disabled="item.screenDisabled"
            :clearable="item.clearable == null ? false : item.clearable"
            @keyup.native.enter="formEnterSubmit ? onSubmit() : null"
          ></el-input>
        </div>
        <!--input number-->
        <div v-if="item.modelType === 'number'">
          <el-input-number
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :placeholder="item.placeholder"
            :clearable="item.clearable == null ? false : item.clearable"
            :controls="false"
            @keyup.native.enter="formEnterSubmit ? onSubmit() : null"
          ></el-input-number>
        </div>
        <!--input number-->
        <div v-if="item.modelType === 'numberrange'" class="daterange">
          <el-input-number
            :id="item.screenItem[0].screenType ? 'search_' + item.screenItem[0].screenType : ''"
            v-model="item.screenValue[0]"
            :placeholder="item.screenItem[0].placeholder"
            :clearable="item.clearable == null ? false : item.clearable"
            :controls="false"
            @keyup.native.enter="formEnterSubmit ? onSubmit() : null"
          ></el-input-number>
          <span style="padding: 0 4px">-</span>
          <el-input-number
            :id="item.screenItem[1].screenType ? 'search_' + item.screenItem[1].screenType : ''"
            v-model="item.screenValue[1]"
            :placeholder="item.screenItem[1].placeholder"
            :clearable="item.clearable == null ? false : item.clearable"
            :controls="false"
            @keyup.native.enter="formEnterSubmit ? onSubmit() : null"
          ></el-input-number>
        </div>
        <!--时间日期范围-->
        <div v-else-if="item.modelType === 'daterange'" class="daterange">
          <el-date-picker
            :id="item.screenItem[0].screenType"
            v-model="item.screenValue[0]"
            :type="item.type ? item.type : 'date'"
            :picker-options="
              item.pickerOptions === false
                ? null
                : {
                    shortcuts,
                    disabledDate: (o) =>
                      disabledDate(o, [...item.screenValue], 'start', item.disabledDate, item.disableType)
                  }
            "
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.screenItem[0].label ? item.screenItem[0].label : '开始时间'"
            align="right"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span style="padding: 0 4px">-</span>
          <el-date-picker
            :id="item.screenItem[1].screenType"
            v-model="item.screenValue[1]"
            :type="item.type ? item.type : 'date'"
            :picker-options="{
              shortcuts,
              disabledDate: (o) => disabledDate(o, [...item.screenValue], 'end', item.disabledDate, item.disableType)
            }"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.screenItem[1].label ? item.screenItem[1].label : '结束时间'"
            align="right"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <!--日期和时间点范围-->
        <div v-else-if="item.modelType === 'datetimerange'" class="daterange">
          <el-date-picker
            :id="item.screenItem[0].screenType"
            v-model="item.screenValue[0]"
            :picker-options="{ shortcuts }"
            :format="item.format ? item.format : null"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.screenItem[0].label ? item.screenItem[0].label : '开始时间'"
            align="right"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <span style="padding: 0 4px">-</span>
          <el-date-picker
            :id="item.screenItem[1].screenType"
            v-model="item.screenValue[1]"
            :picker-options="{ shortcuts }"
            :format="item.format ? item.format : null"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.screenItem[1].label ? item.screenItem[1].label : '结束时间'"
            align="right"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <!--单个时间日期-->
        <div v-else-if="item.modelType === 'date'" class="dataBox">
          <el-date-picker
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :type="item.type ? item.type : 'date'"
            :editable="item.editable == null ? true : item.editable"
            :picker-options="item.pickerOptions ? item.pickerOptions : { shortcuts }"
            :value-format="item.type && item.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.placeholder ? item.placeholder : item.screenLabel"
            align="right"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          ></el-date-picker>
        </div>
        <!--月份 时间日期-->
        <div v-else-if="item.modelType === 'month'" class="dataBox">
          <el-date-picker
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :editable="item.editable == null ? true : item.editable"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.placeholder ? item.placeholder : item.screenLabel"
            align="right"
            type="month"
            value-format="yyyy-MM"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          ></el-date-picker>
        </div>
        <!--年份 时间日期-->
        <div v-else-if="item.modelType === 'year'" class="dataBox">
          <el-date-picker
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :editable="item.editable == null ? true : item.editable"
            :clearable="item.clearable == null ? false : item.clearable"
            :placeholder="item.placeholder ? item.placeholder : item.screenLabel"
            align="right"
            type="year"
            value-format="yyyy"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          ></el-date-picker>
        </div>
        <!--下拉选项-->
        <div v-else-if="item.modelType === 'select'">
          <el-select
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :disabled="item.disabled"
            :placeholder="item.screenLabel"
            :clearable="item.clearable == null ? false : item.clearable"
            :popper-class="item.screenOptionSize"
            :filterable="item.filterable == null ? false : item.filterable"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          >
            <el-option v-for="(k, kIndex) in item.screenItem" :key="kIndex" :label="k.label" :value="k.value">
              <span :id="(item.screenType ? 'search_' + item.screenType : '') + '_' + k.value" :value="k.value">
                {{ k.label }}
              </span>
            </el-option>
          </el-select>
        </div>
        <!--多项下拉选项-->
        <div v-else-if="item.modelType === 'selectMultiple'">
          <el-select
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            :placeholder="item.screenLabel"
            :clearable="item.clearable == null ? false : item.clearable"
            :collapse-tags="item.collapseTags ? true : false"
            :popper-class="item.screenOptionSize"
            multiple
            filterable
            default-first-option
            @visible-change="item.visibleChange ? item.visibleChange($event) : null"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          >
            <el-option v-for="(k, kIndex) in item.screenItem" :key="kIndex" :label="k.label" :value="k.value">
              <span v-if="k.desc" style="float: left">{{ k.label }}</span>
              <span v-if="k.desc" style="float: right; color: #8492a6; font-size: 12px; margin-right: 16px">
                {{ k.value }}
              </span>
            </el-option>
          </el-select>
        </div>



        <!-- <div v-else-if="item.modelType === 'selectMultipleAndMore'">
          <SelectOptionsFromBaseData
            :ref="'selectMultipleAndMore' + item.screenType"
            :v-model="item.screenValue"
            :index="index"
            :system="item.system"
            :bind-value="item.bindValue"
            :basic-data-type="item.basicDataType"
            :query-type="item.queryType"
            :organization-code="item.organizationCode"
            :multiple="!item.closeMultiple"
            @selectMultipleAndMoreChange="selectMultipleAndMoreChange"
            @change="item.handleOnChange ? item.handleOnChange(item.screenValue, item.screenName) : null"
          ></SelectOptionsFromBaseData>
        </div> -->

        <!--单项选项-->
        <div v-else-if="item.modelType === 'radio'">
          <el-radio-group :id="item.screenType ? 'search_' + item.screenType : ''" v-model="item.screenValue">
            <el-radio
              v-for="(k, kIndex) in item.screenItem"
              :key="kIndex"
              :label="k.value"
              @click.native.prevent="handleRadioItem(k.value, item)"
            >
              {{ k.label }}
            </el-radio>
          </el-radio-group>
        </div>
        <!--多选选项-->
        <div v-else-if="item.modelType === 'checkbox'">
          <el-checkbox-group
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            size="mini"
            @change="handleCheckedChange($event, item)"
          >
            <el-checkbox v-for="(k, kIndex) in item.screenItem" :key="kIndex" :label="k.value">
              {{ k.label }}
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox
            v-model="item.checkAll"
            :indeterminate="item.isIndeterminate"
            @change="handleCheckAllChange($event, item)"
          >
            全选
          </el-checkbox>
        </div>
        <!--多选选项-->
        <div v-else-if="item.modelType === 'checkboxButton'">
          <el-checkbox-group
            :id="item.screenType ? 'search_' + item.screenType : ''"
            v-model="item.screenValue"
            size="mini"
            @change="handleCheckedChange($event, item)"
          >
            <el-checkbox-button v-for="(k, kIndex) in item.screenItem" :key="kIndex" :label="k.value">
              {{ k.label }}
            </el-checkbox-button>
          </el-checkbox-group>
          <el-checkbox
            v-if="item.screenItem && item.screenItem.length"
            v-model="item.checkAll"
            :indeterminate="item.isIndeterminate"
            @change="handleCheckAllChange($event, item)"
          >
            全选
          </el-checkbox>
        </div>

        <!--Cascader 级联选择器-->
        <div v-else-if="item.modelType === 'cascader'">
          <el-cascader
            :id="item.screenType ? 'search_' + item.screenType : ''"
            :key="cascaderKey"
            v-model="item.screenValue"
            :disabled="item.disabled"
            :filterable="item.filterable == null ? true : item.filterable"
            :placeholder="item.screenLabel"
            :options="item.screenItem"
            :show-all-levels="false"
            :props="{
              multiple: item.multiple,
              expandTrigger: 'hover',
              emitPath: isEmpty(item.emitPath) ? true : item.emitPath
            }"
            :clearable="item.clearable == null ? true : item.clearable"
            :collapse-tags="item.collapse ? item.collapse : false"
            class="cascader"
            size="mini"
            style="width: 100%"
            @change="
              item.handleOnChange ? item.handleOnChange(item.screenValue) : null
              item.changeSubmit ? onSubmit() : null
            "
          ></el-cascader>
        </div>

        <!--自定义-->
        <div v-else-if="item.modelType === 'slot'">
          <slot :name="item.screenType" :row="item"></slot>
        </div>
      </el-form-item>

      <el-form-item>
        <div v-if="configInfoData.length" style="margin-left: 30px; padding-top: 4px; min-width: 220px">
          <slot name="btn_pre"></slot>
          <el-button v-if="formSubmit" id="search_submit" class="verTop" type="primary" @click="onSubmit">
            查询
          </el-button>
          <el-button v-if="formReset" class="verTop" type="info" @click="onResetData">重置</el-button>
          <el-button
            v-if="formMore && isOpenMoreScreen && openMoreScreen"
            class="verTop"
            type="primary"
            @click="moreScreenSelect"
          >
            更多条件
          </el-button>
          <el-button
            v-if="formMore && isOpenMoreScreen && !openMoreScreen"
            class="verTop"
            type="primary"
            @click="moreScreenSelect"
          >
            收起
          </el-button>
          <slot name="button"></slot>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import cache from './utils/cache'
  // import SelectOptionsFromBaseData from '@/components/common/selectOptionsFromBaseData/selectOptionsFromBaseData.vue'

  export default {
    // components: { SelectOptionsFromBaseData },
    props: {
      /*查询配置项*/
      configInfo: {
        type: Array,
        default: () => []
      },
      /*label 宽度(默认: 最大的label宽度, auto: 不设置)*/
      // eslint-disable-next-line vue/require-default-prop
      formLabelWidth: {
        type: [Number, String]
      },
      /*是否开启更多条件功能*/
      formMore: {
        type: Boolean,
        default: true
      },
      /*是否弹性布局*/
      formFlex: {
        type: Boolean,
        default: true
      },
      /*弹性布局一行显示个数(2-5)*/
      formSpan: {
        type: Number,
        default: 5
      },
      /*是否开启重置(默认开启)*/
      formReset: {
        type: Boolean,
        default: true
      },
      /*是否显示查询(默认显示)*/
      formSubmit: {
        type: Boolean,
        default: true
      },
      /*是否开启查询条件缓存本地(默认关闭)*/
      formCache: {
        type: Boolean,
        default: true
      },
      /*是否开启回车触发查询(默认开启)*/
      formEnterSubmit: {
        type: Boolean,
        default: true
      }
    },
    /*{
          modelType: "text",          //输入框类型（text文本框、date单个日期、daterange日期范围（日期）、datetimerange日期范围（日期和时间点）、select下拉项、selectMultiple多选下拉项、radio单选、(checkbox/checkboxButton)多选）
          screenLabel: "采购订单编号ID",//描述
          screenType: "purchaseID",   //key
          screenValue: null,          //value（*checkbox、daterange、datetimerange、selectMultiple默认必传[]）
          screenWidth: 20,            //宽度（20/40/60/80/100、25/50/33/66、'auto'）
          screenVisibility: {screenType: 'queryWarehouseType',screenValue: ['车间仓库','机上仓库']},//查询项显示规则（仓库类型为车间仓库/机上仓库才可查询）
          screenInvisible: false      //是否收起（默认不收起，configInfo都没设置screenInvisible，会根据默认收起）
          clearable: true,            //是否可以清空选项（默认true）
          changeSubmit: true,         //切换（select/selectMultiple）触发查询（默认false）
          screenItem: [
              //1：select/selectMultiple/radio/checkbox/checkboxButton
              {value: "prepay_incidental", label: "预付杂费"},
              {value: "prepay_earnest", label: "预付定金"},
              {value: "nopay", label: "无需支付"},

              2：daterange/datetimerange
              {label: "开始时间", screenType: "startTime"},
              {label: "结束时间", screenType: "endTime"},
          ],
      },
      {},为空对象时：换行（formFlex:false才会有效果）

   * */
    data() {
      return {
        cascaderKey: 1,
        oFormLabelWidth: null,
        configInfoData: this.configInfo,
        defaultConfigInfoData: {}, //查询条默认值
        openMoreScreen: false, //是否展开
        openMoreScreenType: true, //收起类型（configInfo都没设置screenInvisible默认收起中间部分）
        isOpenMoreScreen: false, //是否多查询需要收起
        formItemLength: 0,
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ],
        noCacheKey: [] // 无需缓存的key值
      }
    },
    watch: {
      configInfo: {
        handler(newData, oldData) {
          this.cascaderKey++
          //组件初始化
          if (newData && (!oldData || (oldData && !oldData.length))) {
            
            this.configInfoData = newData
            this.screenInit()
          } else {
            //配置数据再次更新，只能修改screenItem值（screenValue值的修改使用setScreenValue或者setCurrentScreenData方法）
            this.configInfoData.map((m, i) => {
              if (m.screenItem) m.screenItem = newData[i].screenItem
              m.disabled = newData[i].disabled

              // 监听更新 organizationCode
              // if (m.modelType === 'selectMultipleAndMore') {
              //   m.organizationCode = newData[i].organizationCode
              // }
            })
          }
        },
        deep: true
      }
    },
    created() {
      this.screenInit()
    },
    mounted() {
      /*回车键触发查询*/
      if (this.formEnterSubmit) {
        window.addEventListener(
          'keydown',
          (event) => {
            let handled = false
            if (event.key !== undefined && event.key === 'Enter') {
              handled = true
            } else if (event.keyCode !== undefined && event.keyCode === 13) {
              handled = true
            }

            if (handled) {
              if (document.querySelector('.el-loading-mask') || document.querySelector('.v-modal')) {
                return false
              } else {
                this.onSubmit()
              }
            }
          },
          true
        )
      }
    },
    methods: {
      getPageQueryAccessID() {
        // 获取页面查询缓存的唯一标识
        return 'query_' + this.$route.path.split('/').join('')
      },
      isEmpty(value) {
        return value === null || value === undefined || value === ''
      },
      // 获取随机数
      random(min, max) {
        return Math.floor(Math.random() * (max - min)) === min ? min + 1 : Math.floor(Math.random() * (max - min)) + min
      },
      // selectMultipleAndMoreChange(configInfoDataIndex, data, selectName) {
      //   this.configInfoData[configInfoDataIndex].screenValue = data
      //   this.configInfoData[configInfoDataIndex].screenName = selectName
      // },
      /*查询数据-- 初始化*/
      screenInit() {
        if (!this.configInfoData || (this.configInfoData && !this.configInfoData.length)) return
        //设置screenLabel width
        const margin = 10
        const formLabelWidthArr = this.configInfoData
          .filter((f) => f.screenLabel)
          .map((m) => m.screenLabel.length * 14 + margin)
        this.oFormLabelWidth =
          this.formLabelWidth != null ? this.formLabelWidth : Math.max.apply(null, formLabelWidthArr)

        //configInfo都没设置screenInvisible，根据默认收起
        this.configInfoData.forEach((m) => {
          if (m.screenInvisible) this.openMoreScreenType = false
        })
        //写入默认参数(screenValue)
        this.defaultConfigInfoData = JSON.stringify(this.getCurrentScreenData())

        //设置 是否开启更多条件功能
        if (this.formMore) {
          this.formItemLength = 0
          this.configInfoData.forEach(
            (e) => (this.formItemLength += ['daterange', 'datetimerange'].includes(e.modelType) ? 2 : 1)
          )
          if (this.formItemLength > 10 || !this.openMoreScreenType) {
            this.isOpenMoreScreen = true
            this.moreScreenSelect()
          }
        }

        // 存在页面查询缓存 默认赋值
        if (this.formCache) {
          if (cache.getSession(this.getPageQueryAccessID())) {
            const screenConfigData = cache.getSession(this.getPageQueryAccessID())
            this.setCurrentScreenData(screenConfigData)
            this.$emit('screeningReset', this.getCurrentScreenfilterData())
          }
        }
        // 清除不需要缓存的搜索项
        this.configInfoData.forEach((item) => {
          if (item.noformCache) {
            item.screenValue = null
          }
        })
      },
      /*查询数据-- 重置*/
      onResetData() {
        this.setCurrentScreenData(JSON.parse(this.defaultConfigInfoData))

        // const selectMultipleAndMoreArr = this.configInfoData.filter((item) => {
        //   return item.modelType === 'selectMultipleAndMore'
        // })
        // selectMultipleAndMoreArr.forEach((item) => {
        //   const refStr = 'selectMultipleAndMore' + item.screenType
        //   this.$refs[refStr][0].clearVal()
        // })

        this.$emit('screeningReset', this.getCurrentScreenfilterData())
      },

      /*查询数据 --提交*/
      onSubmit() {
        /*选择日期范围限制*/
        let timeError = false
        //先将configInfoData这个数组的值中含有"daterange", "datetimerange"的数据过滤出来，
        //然后再看过滤出的对象的screenValue值，即用户选中的开始结束时间
        this.configInfoData
          .filter((f) => ['daterange', 'datetimerange'].includes(f.modelType))
          .forEach((e) => {
            const [startTime, endTime] = e.screenValue
            //开始结束时间都有值，且开始时间大于结束时间
            if (startTime && endTime && new Date(startTime).getTime() > new Date(endTime).getTime()) {
              timeError = true
            }
          })
        if (timeError) {
          this.$message('选择时间日期范围有误！')
          return false
        }
        //查询条件储存本地
        if (this.formCache) {
          this.configInfoData.forEach((item) => {
            // if (item.modelType === 'selectMultipleAndMore') {
            //   this.noCacheKey.push(item.screenType)
            // }
          })

          const cacheData = this.getCurrentScreenData()
          this.noCacheKey.forEach((item) => {
            if (cacheData[item]) {
              cacheData[item] = []
            }
          })

          cache.setSession(this.getPageQueryAccessID(), JSON.stringify(cacheData))
        }
        this.$emit('screeningSubmit', this.getCurrentScreenfilterData())
      },
      //form表单组件值change时向外传递值
      changeEmit() {
        this.$emit('changeEmit', this.getCurrentScreenfilterData())
      },
      //获取查询条件数据
      getCurrentScreenfilterData() {
        const newDataScreenData = {}
        this.configInfoData
          .filter((f) => f.screenValue === 0 || f.screenValue === false || !!f.screenValue)
          .filter((f) => !(f.screenValue instanceof Array && !f.screenValue.length))
          .filter(
            (f) =>
              !f.screenVisibility ||
              (f.screenVisibility &&
                f.screenVisibility.screenType &&
                f.screenVisibility.screenValue.indexOf(
                  this.configInfoData[this.getScreenItemIndex(f.screenVisibility.screenType)].screenValue
                ) !== -1)
          )
          .forEach((item) => {
            if (item.modelType === 'daterange') {
              item.screenItem.forEach((e, i) => {
                if (item.screenValue[i]) {
                  item.screenValue[i] = new Date(item.screenValue[i])
                  if (i === 0) {
                    item.screenValue[i].setHours(0, 0, 0)
                  } else {
                    item.screenValue[i].setHours(23, 59, 59)
                  }
                  newDataScreenData[e.screenType] = this.$options.filters.date(
                    item.screenValue[i],
                    item.screenFormat ? item.screenFormat : 'yyyy-MM-dd'
                  )
                }
              })
            } else if (item.modelType === 'datetimerange') {
              item.screenItem.forEach((e, i) => {
                if (item.screenValue[i])
                  newDataScreenData[e.screenType] = this.$options.filters.date(
                    item.screenValue[i],
                    item.screenFormat ? item.screenFormat : 'yyyy-MM-dd HH:mm:ss'
                  )
              })
            } else if (item.modelType === 'date') {
              item.screenValue = new Date(item.screenValue)
              item.screenValue.setHours(0, 0, 0)
              newDataScreenData[item.screenType] = this.$options.filters.date(
                item.screenValue,
                item.screenFormat ? item.screenFormat : 'yyyy-MM-dd'
              )
            } else {
              newDataScreenData[item.screenType] = item.screenValue
            }
          })
        return newDataScreenData
      },
      getCurrentScreenData() {
        const currentScreenData = {}
        this.configInfoData.forEach((m) => {
          if (['daterange', 'datetimerange'].includes(m.modelType)) {
            let [timeStart, timeEnd] = m.screenValue
            timeStart = timeStart ? this.$options.filters.date(timeStart, 'yyyy-MM-dd HH:mm:ss') : null
            timeEnd = timeEnd ? this.$options.filters.date(timeEnd, 'yyyy-MM-dd HH:mm:ss') : null
            currentScreenData[m.screenItem[0].screenType] = [timeStart, timeEnd]
          } else {
            currentScreenData[m.screenType] = m.screenValue
          }
        })
        return currentScreenData
      },
      setCurrentScreenData(data) {
        if (!data || data == {}) return
        this.configInfoData.map((m) => {
          //写入默认值
          if (['daterange', 'datetimerange'].includes(m.modelType)) {
            const dateTypeName = m.screenItem[0].screenType
            m.screenValue = data[dateTypeName] && data[dateTypeName].length ? data[dateTypeName] : []
          } else {
            m.screenValue = data[m.screenType]
          }
          if (['checkbox', 'checkboxButton'].includes(m.modelType)) {
            this.handleCheckedChange(data[m.screenType] ? data[m.screenType] : [], m)
          }
          if (m.modelType === 'number') {
            m.screenValue = data[m.screenType] ? data[m.screenType] : undefined
          }
          // if (m.modelType === 'selectMultipleAndMore') {
          //   m.screenValue = data[m.screenType] ? data[m.screenType] : []
          // }
          return m
        })
      },
      /*查询数据-- 更多条件*/
      moreScreenSelect() {
        this.openMoreScreen = JSON.parse(JSON.stringify(!this.openMoreScreen))
        let oIndex = 0
        this.configInfoData.map((m) => {
          if (this.openMoreScreenType) {
            oIndex += ['daterange', 'datetimerange'].includes(m.modelType) ? 2 : 1
            if (oIndex > this.formSpan && oIndex <= this.formItemLength - (this.formItemLength % this.formSpan)) {
              m.visibility = this.openMoreScreen
            }
          } else {
            if (m.screenInvisible) m.visibility = this.openMoreScreen
          }
        })
        this.$emit('screenMoreChange')
      },

      /*获取 screen index*/
      getScreenItemIndex(screenType) {
        return this.configInfoData.findIndex((f) => f.screenType === screenType)
      },
      setHideOrShow(arr = [], flag) {
        // flag=true 显示  否则隐藏 暂时只支持text组件，后续完善
        this.configInfoData.forEach((item) => {
          if (arr.includes(item.screenType)) {
            item.modelType = flag ? 'text' : 'hidden'
          }
        })
      },
      /*设置 screen value*/
      setScreenValue(screenType, screenValue) {
        if (screenType instanceof Object) {
          const screenDefaultValue = Object.entries(screenType).map(([label, value]) => {
            return { label, value }
          })
          this.configInfoData = this.configInfoData.map((m) => {
            screenDefaultValue.forEach((e) => {
              if (m.screenType === e.label) {
                m.screenValue = e.value
              }
            })
            return m
          })
        } else {
          let arr = []
          arr = this.configInfoData.map((m) => {
            if (m.screenType === screenType) {
              m.screenValue = screenValue

              // if (m.modelType === 'selectMultipleAndMore') {
              //   const refStr = 'selectMultipleAndMore' + m.screenType
              //   this.$refs[refStr][0].setVal(screenValue)
              // }
            }

            if (m.modelType === 'daterange') {
              m.screenItem.map((item, index) => {
                if (item.screenType === screenType) {
                  m.screenValue[index] = screenValue
                }
              })
            }
            return m
          })
          this.configInfoData = arr
        }
      },

      /*checkbox/checkboxButton 全选*/
      handleCheckAllChange(val, item) {
        this.configInfoData.map((m) => {
          if (m.screenType === item.screenType) {
            m.screenValue = val ? m.screenItem.map((n) => n.value) : []
            m.isIndeterminate = false
          }
          return m
        })
      },
      /*checkbox/checkboxButton 全选*/
      handleCheckedChange(val, item) {
        const checkedCount = val.length
        this.configInfoData = this.configInfoData.map((m) => {
          if (m.screenType === item.screenType) {
            m.checkAll = checkedCount === m.screenItem.length
            m.isIndeterminate = checkedCount > 0 && checkedCount < m.screenItem.length
          }
          return m
        })
      },
      handleRadioItem(val, item) {
        val === item.screenValue ? (item.screenValue = '') : (item.screenValue = val)
      },
      /*选择日期范围限制*/
      disabledDate(time, [start, end], type, disabledDate, disableType) {
        if (type === 'start' && end) {
          let dateAble
          if (disabledDate) {
            if (disableType == 'before') {
              dateAble = time.getTime() < new Date(disabledDate).getTime() || time.getTime() >= new Date(end).getTime()
            } else {
              dateAble = time.getTime() >= new Date(disabledDate).getTime() || time.getTime() >= new Date(end).getTime()
            }
          } else {
            dateAble = time.getTime() >= new Date(end).getTime()
          }
          return dateAble
        } else if (type === 'end' && start) {
          let dateAble
          if (disabledDate) {
            if (disableType == 'before') {
              dateAble =
                time.getTime() < new Date(disabledDate).getTime() ||
                time.getTime() < new Date(new Date(start).setHours(0, 0, 0, 0)).getTime()
            } else {
              dateAble =
                time.getTime() >= new Date(disabledDate).getTime() ||
                time.getTime() < new Date(new Date(start).setHours(0, 0, 0, 0)).getTime()
            }
          } else {
            dateAble = time.getTime() < new Date(new Date(start).setHours(0, 0, 0, 0)).getTime()
          }
          return dateAble
        } else {
          if (disabledDate) {
            if (disableType == 'before') {
              return time.getTime() < new Date(disabledDate).getTime()
            } else {
              return time.getTime() >= new Date(disabledDate).getTime()
            }
          }
          return false
        }
      }
    }
  }
</script>

<style lang="less">
  .screening_wrapper {
    min-height: 30px;
  }

  /*换行*/
  .screening_wrapper .el-form-item.line_feed {
    display: block;
    margin: 0;
    height: 0;
    line-height: 0;
    padding: 0;
  }

  .screening_wrapper .screening_con {
    display: flex;
    flex-wrap: wrap;
  }

  .screening_wrapper .el-select,
  .screening_wrapper .dataBox .el-date-editor.el-input,
  .screening_wrapper .el-input-number,
  .screening_wrapper .el-cascader {
    width: 100%;
  }

  .screening_wrapper .screening_con .el-form-item {
    display: flex;
    margin-right: 0;
  }

  .screening_wrapper .screening_con .flex20 {
    width: 20%;
  }

  .screening_wrapper .screening_con .flex25 {
    width: 25%;
  }

  .screening_wrapper .screening_con .flex33 {
    width: 33%;
  }

  .screening_wrapper .screening_con .flex40 {
    width: 40%;
  }

  .screening_wrapper .screening_con .flex50 {
    width: 50%;
  }

  .screening_wrapper .screening_con .flex60 {
    width: 60%;
  }

  .screening_wrapper .screening_con .flex66 {
    width: 66%;
  }

  .screening_wrapper .screening_con .flex80 {
    width: 80%;
  }

  .screening_wrapper .screening_con .flex100 {
    width: 100%;
  }

  .screening_wrapper .screening_con .el-form-item__content {
    flex: 1;
    margin-right: 10px;
  }

  .screening_wrapper .screening_con .daterange {
    display: flex;
    width: 100%;
  }

  .screening_wrapper .screening_con .daterange .el-date-editor--date,
  .screening_wrapper .screening_con .daterange .el-date-editor--datetime {
    flex: 1;
    width: 100%;
  }

  .screening_wrapper .input170 .el-input {
    width: 170px;
  }

  .screening_wrapper .el-select__tags .el-select__input {
    height: 28px;
  }

  .screening_wrapper .el-input-number .el-input__inner {
    text-align: left;
  }

  .screening_wrapper .el-checkbox-group {
    display: inline-block;
    vertical-align: middle;
  }

  .screening_wrapper .el-checkbox-group .el-checkbox-button {
    outline: none;
    margin-left: -1px;
    margin-bottom: 4px;
  }

  .screening_wrapper .el-checkbox-group .el-checkbox-button--mini .el-checkbox-button__inner {
    padding: 7px;
    border-left: 1px solid #dcdfe6;
  }

  .screening_wrapper .el-checkbox-group .el-checkbox-button--mini.is-focus .el-checkbox-button__inner {
    border-color: #dcdfe6;
  }

  .screening_wrapper .el-checkbox-group .el-checkbox-button.is-checked .el-checkbox-button__inner {
    box-shadow: 0px 0 0 0 #8cc5ff;
  }

  .verTop {
    vertical-align: top;
  }

  /*去除el-radio选中阴影*/
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .el-cascader-panel .el-checkbox {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    margin-right: 10px;
    /* right: 10px; */
  }

  .el-cascader-node__label {
    padding: 0 20px;
  }

  .screening_wrapper .el-tag {
    align-items: center;
    width: 40px;
    display: flex;
  }

  .screening_wrapper .el-tag:first-child {
    width: 70%;
    display: flex;
  }

  .el-select__tags-text {
    width: 100%;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-select .el-tag__close.el-icon-close {
    top: 1px;
    right: -4px;
  }

  .el-select__tags:first-child {
    & > span {
      display: contents !important;
    }
  }

  .el-select__tags {
    white-space: nowrap;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .el-cascader__tags-text {
    width: 100%;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-cascader .el-tag__close.el-icon-close {
    top: 1px;
    right: -4px;
  }

  .el-cascader__tags:first-child {
    & > span {
      display: contents !important;
    }
  }

  .el-cascader__tags {
    white-space: nowrap;
    flex-wrap: nowrap;
    overflow: hidden;
    height: 25px;
  }

  .cascader {
    .el-input .el-input--mini .el-input--suffix {
      height: 25px;
    }
  }
</style>
