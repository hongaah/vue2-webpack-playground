<template>
  <div class="element-pagination">
    <el-card v-loading="activityLoading" class="box-card card-form">
      <div slot="header">
        <span>elementUI 分页</span>
      </div>
      <div class="content">
        <div v-if="activityList.length" class="activity">
            <ActivityItem v-for="activity in activityList" :key="activity.id" :activity="activity" />
            <div class="pagination">
              <el-pagination
                :total="pages.activity.total"
                :hide-on-single-page="false"
                :page-size="pages.activity.pageSize"
                :current-page.sync="pages.activity.currentPage"
                @current-change="getActivityData"
                layout="prev, pager, next"
              ></el-pagination>
            </div>
          </div>
          <div v-else>
            <BaseEmpty title="暂无动态" :show-image="true" />
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import ActivityItem from '@/components/ActivityItem'

export default {
  name: 'ElementPagination',
  components: {
    ActivityItem
  },
  data () {
    return {
      activityList: [
        {
          id: 1,
          icon: '',
          person: 'liuhaoran',
          time: '2020-07-12 12:06',
          action: '添加了一个文件',
          project: 'xxx project',
          projectId: 'FW1130'
        }, {
          id: 2,
          icon: '',
          person: 'liuhaoran',
          time: '2020-07-12 12:06',
          action: '添加了一个文件',
          project: 'xxx project',
          projectId: 'FW1130'
        }
      ],
      activityLoading: false,
      pages: {
        activity: {
          currentPage: 1, // 当前页
          pageSize: 1, // 第几页
          total: 0 // 总页数
        }
      }
    }
  },
  methods: {
    getActivityData (page) {
      // this.activityLoading = true
      // this.axios
      //   .get('/api/userOper/getMy', {
      //     params: {
      //       status: 0,
      //       paging: true,
      //       pageNumber: page || 1,
      //       pageSize: 8
      //     }
      //   })
      //   .then(({ data }) => {
      //     if (page) {
      //       this.pages.activity.currentPage = data.data.page_number
      //     } else {
      //       this.pages.activity.pageSize = data.data.page_number
      //       this.pages.activity.total = Math.ceil(
      //         data.data.total_count / data.data.page_size
      //       )
      //     }
      //     this.activityList = data.data.results.map(item => {
      //       return {
      //         id: item.id,
      //         icon: item.icon,
      //         person: item.username,
      //         time: item.updated_at,
      //         action: item.content,
      //         project: item.project_name,
      //         projectId: item.project_id
      //       }
      //     })
      //   })
      //   .finally(() => {
      //     this.activityLoading = false
      //   })
    }
  }
}
</script>
