<template>
  <el-pagination
    ref="page"
    class="new-page"
    v-bind="$attrs"
    :current-page="pageInfo.pageNum"
    :page-size="pageInfo.pageSize"
    :pager-count="5"
    background
    layout="total, prev, pager, next,sizes, slot"
    @current-change="onCurrentChange"
    @size-change="onSizeChange"
  >
    <!--        :page-sizes="[10, 20, 30, 40, 50]"-->
    <div class="inline-block">
      <span class="leading-32 h-32">前往页</span>
      <el-input size="small" :value="inputPageNum" class="w-110 ml-10 jump" @input="onInputPageNum" @blur="inputBlur">
        <el-button slot="append" class="text-367" @click="onJump()">跳转</el-button>
      </el-input>
    </div>
  </el-pagination>
</template>

<script>
  import '../style/index.scss'
  import { Pagination as ElPagination, Button as ElButton, Input as ElInput } from 'element-ui'
  export default {
    name: 'Page',
    components: {
      ElPagination,
      ElButton,
      ElInput
    },
    data() {
      this.initPageInfo = {
        pageNum: this.$attrs.defaultCurrentPage || 1,
        pageSize: this.$attrs['default-page-size'] || 10
      }
      return {
        inputPageNum: this.initPageInfo.pageNum,
        pageInfo: { ...this.initPageInfo }
      }
    },
    methods: {
      onCurrentChange(current) {
        this.pageInfo.pageNum = current
        this.inputPageNum = this.pageInfo.pageNum
        this.query()
      },

      onSizeChange(size) {
        this.pageInfo.pageSize = size
        this.query()
      },
      onInputPageNum(value) {
        this.inputPageNum = value
      },
      inputBlur() {
        const pageNum = parseInt(this.inputPageNum)
        if (!Number.isNaN(pageNum)) {
          const maxPageNum = Math.ceil(this.$attrs.total / this.pageInfo.pageSize)
          // 容错处理，限制最大最小页码
          this.inputPageNum = Math.max(1, Math.min(pageNum, maxPageNum))
        }
      },
      onJump() {
        this.pageInfo.pageNum = this.inputPageNum
        this.query()
      },

      query(queryNow = true) {
        this.$emit(
          'query',
          {
            pageNum: this.pageInfo.pageNum,
            pageSize: this.pageInfo.pageSize
          },
          queryNow
        )
      },

      reset(queryNow = true, resetSize = false) {
        this.pageInfo.pageNum = this.initPageInfo.pageNum
        this.$refs.page.lastEmittedPage = this.initPageInfo.pageNum
        if (resetSize) {
          this.pageInfo.pageSize = this.initPageInfo.pageSize
        }
        this.query(queryNow)
      },

      getPageParams() {
        return { ...this.pageInfo }
      }
    }
  }
</script>
