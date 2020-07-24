<template>
  <div class="slot-sample">
    <div class="content">
      <slot>
        <h1>默认标题</h1>
      </slot>
      <slot name="paragraph">
      </slot>
      <slot name="sonData" :user="user"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotSample',
  data () {
    return {
      user: undefined
    }
  }
}
</script>
