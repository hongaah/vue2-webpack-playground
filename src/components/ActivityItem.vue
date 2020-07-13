<template>
  <div class="activity-item">
    <div @click="toUserProfile" class="avatar">
      <el-avatar :src="activity.icon">{{ activity.person }}</el-avatar>
    </div>
    <div class="description">
      <div class="top">
        <span @click="toUserProfile" class="person">{{ activity.person }}</span>
        <span class="action">{{ activity.action }}</span>
      </div>
      <div class="bottom">
        <span class="time">{{ activity.time }}</span>
        <span v-if="activity.project" class="project" @click="toProject">- {{ activity.project }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Object,
      default: function () {
        return {
          id: '',
          icon: '',
          person: '',
          time: '',
          project: '',
          action: '',
          projectId: ''
        }
      }
    }
  },
  methods: {
    toUserProfile () {
      this.$router.push({
        name: 'Profile',
        query: {
          user: this.activity.person
        }
      })
    },
    toProject () {
      this.$router.push({
        name: 'ProjectView',
        query: {
          id: this.activity.projectId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-item {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  border-bottom: 0.5px solid #f5f5f5;
  font-size: 12px;

  .avatar .el-avatar {
    background: chartreuse;
    cursor: pointer;
  }
  .description {
    margin-left: 10px;
    width: 90%;

    .top {
      margin-top: 4px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .person {
        color: #303133;
        margin-right: 5px;
        cursor: pointer;
      }
      .action {
        color: #606266;
      }
    }
    .bottom {
      color: #909399;
      margin-top: 2px;
      .time {
        margin-right: 5px;
      }
      .project {
        cursor: pointer;
      }
    }
  }
}
</style>
