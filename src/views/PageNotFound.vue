<template>
  <div class="error">
    <p>404 找不到该页面</p>
    <router-link to="/Home" class="error-link">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  methods: {
    backhome () {
      this.$router.push({ path: '/Home' })
    }
  }
}
</script>

<style scoped>
.error {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.error p {
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.error-link {
  width: 200px;
  height: 30px;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  color: #094;
}
</style>
