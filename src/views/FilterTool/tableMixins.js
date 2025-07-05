export default {
  data() {
    return {
      pageTotal: 0, //数据总数
      pageIndex: 1, //当前页数
      pageSize: 20, //每页条数
      pageSizeOptions: [10, 20, 50, 100], // 指定每页可以显示多少条
      tableMaxHeight: 3000,
      tableHeight: 3000,
      screenConfigData: [], //筛选项配置
      //筛选查询条件
      currentPageScreenData: {},
      //列表数据
      currentPageListDataArray: [], //列表数据
      activeItem: {}, //单选项
      multipleSelection: [] //多选项
    }
  },
  methods: {
    /*查询*/
    screeningChange(data) {
      this.currentPageScreenData = data
      this.pageIndex = 1
      this.$refs.elpagination.lastEmittedPage = this.pageIndex
      this.requestListData()
    },
    /*选中项*/
    handleTableChange(val) {
      if (val) {
        this.activeItem = val //选中item
      }
    },
    /*列表数据--当前页改变*/
    handleCurrentChange(data) {
      this.pageIndex = data
      this.requestListData()
    },
    /*列表数据--列表大小改变*/
    handleSizeChange(data) {
      this.pageSize = data
      this.clearcacheData()
      this.requestListData()
    },
    /*列表数据--跳转首页*/
    clearcacheData() {
      this.pageIndex = 1
      this.$refs.elpagination.lastEmittedPage = 1
    },
    /*列表数据--写入选中数据*/
    handleToggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    /*列表操作--选中数据变化*/
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
