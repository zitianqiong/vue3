<template>
  <!--面包屑-->
  <el-breadcrumb separator=">">
    <!--默认给一个首页的跳转，如果不需要可以去掉-->
    <el-breadcrumb-item v-if="!breadList" :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!--面包屑列表-->
    <el-breadcrumb-item
            v-for='(item,index) in breadList'
            :key='index'
            @click.native="breadcrumbClick(item)"
            style="cursor: pointer">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {useRouter} from "vue-router"
import {ref, watch} from "vue";

let router = useRouter();
let breadList = ref([]); // 路由集合
// 面包屑数据处理
const isHome = (route) => {
  return route.name === "home";
};
const getBreadcrumb = () => {
  let matched = router.currentRoute.value.matched;
  //如果不是首页
  // if (!isHome(matched[0])) {
  //   matched = [{ path: "/",name:"首页"}].concat(matched);
  // }
  breadList.value = matched;
};
getBreadcrumb();
watch(
  () => router.currentRoute.value,
  () => {
    // 监听路由的变化
    getBreadcrumb();
  },
);
// 面包屑点击事件
const breadcrumbClick = (item) => {
  router.push({
    path: item.path
  })
};
</script>

<style scoped>

</style>
