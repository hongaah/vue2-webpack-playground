<template>
  <div class="about">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <EchartsInterval />
      </el-col>
      <el-col :sm="24" :md="12">
        <FrontAuth />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <ElementUIForm />
      </el-col>
      <el-col :sm="24" :md="12">
        <ElementPagination />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EchartsInterval from '@/components/EchartsInterval'
import ElementUIForm from '@/components/ElementUIForm'
import ElementPagination from '@/components/ElementPagination'
import FrontAuth from '@/components/FrontAuth'

export default {
  components: {
    EchartsInterval,
    ElementUIForm,
    ElementPagination,
    FrontAuth
  }
}
</script>
