<template>
  <div class="com">
   {{ a }}{{ b }}
  </div>
</template>

<script>
// import { ref, reactive } from '@vue/composition-api'
import { ref, reactive } from 'vue'

export default {
  setup () {
    const a = ref('test')
    const b = reactive({
      a: 1
    })
    return {
      a,
      b
    }
  }
}
</script>
