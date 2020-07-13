<template>
  <div class="empty">
    <div v-if="showImage" class="empty-image">
      <img
        src="http://file.ratection.com/62e9ec9f-c3f0-4a1a-a010-f83ba4fec217-null.png"
        alt="empty"
      />
      <div>
        <span v-if="title">{{ title }}</span>
        <span v-else>暂无内容</span>
      </div>
    </div>
    <div v-else class="empty-text">
      <span v-if="title">{{ title }}</span>
      <span v-else>暂无内容</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    title: String,
    showImage: Boolean
  }
}
</script>

<style lang="scss" scoped>
.empty {
  color: #909399;
  font-size: 12px;

  .empty-image {
    min-height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 70px;
      margin-bottom: 13px;
    }
  }
  .empty-text {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
