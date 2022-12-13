<template>
  <div>
    <el-form ref="loginFormRef"  v-loading="loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             :model="loginForm" :rules="rules" class="loginContainer">
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" auto-complete="false" placeholder="请输入用户名" type="text"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password" auto-complete="false" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="false" placeholder="点击图片更换"
                  style="width: 245px;margin-right: 5px;" type="text" />
        <img :src="captchaUrl" alt="加载失败了" @click="updateCaptcha"/>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-form-item>
        <el-button round style="width: 100%" type="primary" @click="submitLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import {postJson} from "../api";
  import router from "../router"
  import store from "../store"

  let loginForm = reactive({
    username: 'q',
    password: '123456',
    code: ''
  })

  const rules = {
    username: {required: true, message: "请输入用户名", trigger: ['blur','change']},
    password: {required: true, message: "请输入密码", trigger: ['blur','change']},
    code: {required: true, message: "请输入验证码", trigger: ['blur','change']}
  }
  let captchaUrl = ref('/api/captcha?time=' + new Date())
  let loading = ref(false)
  const checked = ref(true)
  let loginFormRef = ref()
  const submitLogin = () => {
    loginFormRef.value.validate((valid, fields) => {
      // 校验
      if (valid) {
        loading = true;
        postJson('/login',loginForm).then(resp=>{
          if (resp.code === 200){
            loading = false;
            //保存用户token
            const tokenStr = resp.data.tokenHead + resp.data.token;
            sessionStorage.setItem('tokenStr',tokenStr);
            let userInfo ={
              isLogin: true,
              name: resp.data.username,
              age: resp.data.age,
            };
            store.commit("setUserInfo", userInfo);
            store.commit("setToken", tokenStr);
            //跳转首页
            //replace 即替换当前页面，无法后退，
            //push 可以后退
            router.replace('/');
          }else {
            loading = false;
            updateCaptcha();
          }
        })
      } else {
        //提示错误信息
        loading = false;
        updateCaptcha();
        return false;
      }
    })
  }
  const updateCaptcha = () => {
    captchaUrl.value = '/api/captcha?time=' + new Date();
  }
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

</style>


