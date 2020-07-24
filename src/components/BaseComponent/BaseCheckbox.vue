<template>
  <div class="basic-button">
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">
    <p>{{ checked }}</p>

    <!-- <input type="text" :value="value" @input="$emit('input', $event.target.value)">
    <p>{{ value }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    checked: Boolean
  },
  model: { // important
    prop: 'checked',
    event: 'change'
  }
}
</script>
