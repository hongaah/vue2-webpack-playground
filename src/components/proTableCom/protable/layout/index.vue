<template>
  <div class="ftp-wrap">
    <div class="filter-wrap" ref="filterWrap">
      <slot name="filter"></slot>
    </div>
    <div class="filter-bottom">
      <slot name="filter-bottom"></slot>
    </div>
    <div class="list-wrap" ref="listWrap">
      <slot name="list"></slot>
    </div>
    <div class="table-bottom">
      <slot name="table-bottom"></slot>
    </div>
    <div class="page-wrap" ref="pageWrap">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script>
import '../style/index.scss'
export default {
  name: 'Layout'
}
</script>
