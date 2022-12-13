<template>
  <div>
    <el-button type="primary" @click="customerList">用户列表</el-button>
    <el-button type="primary" @click="customerInfo">信息</el-button>
    <el-table :data="userList" :stripe=true empty-text="无数据" border :row-class-name="rowClassName">
      <el-table-column type="selection" width="45"/>
      <el-table-column prop="username" align="center" label="用户名"></el-table-column>
      <el-table-column prop="age" align="center" label="年龄"></el-table-column>
    </el-table>
    <br/>
    {{ user.username }}<br/>
    {{ user.age }}
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {get} from "../api";
import {ArrowRight} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

export default {
  name: 'home',
  setup() {
    let userList = ref([]);
    let user = ref({});
    const customerInfo = () => {
      get('/user/info').then(resp => {
        if (resp.code === 200) {
          user.value = resp.data;
        } else {
          ElMessage.error(resp.msg)
        }
      })
    }
    const rowClassName = ({row, rowIndex}) => {
      row.index = rowIndex + 1;
    }
    const customerList = () => {
      get('/user').then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          userList.value = resp.data;
        }
      })
    }
    
    // return 的属性会暴露给模板，模板中可以直接使用,这里没有 return 的， 无法在模板中使用  (官网说的)
    return {
      user, customerInfo, customerList, userList, rowClassName, ArrowRight
    };
  }
};
</script>
