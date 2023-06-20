<template>
  <div>
    vue2.7
    {{ test }}
    <button @click="() => test++">+1</button>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const test = ref(1)
  watch(test, () => {
    alert(test.value)
  })
</script>
