<template>
  <el-result
          icon="warning"
          title="404"
          sub-title="页面丢失了"
  >
    <template #extra>
      <el-button type="primary" @click="router.push('/')">回到首页</el-button>
    </template>
  </el-result>
</template>
<script setup>
import router from "../router"
</script>

