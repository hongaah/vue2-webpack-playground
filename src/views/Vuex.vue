<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      status: this.$store.state.username,
      localUser: 'xh'
    }
  },
  computed: mapState({
    user: state => state.user,
    userAlias: 'user',
    userPlus (state) {
      return state.user.username + this.localUser
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
