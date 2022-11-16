<template>
    <div class="common-layout">
        <el-container class="container">
            <el-header style="height: 65px">
                <div>
                    <img style="cursor:pointer;" @click="router.replace('/')" src="../assets/vue.svg" alt="" />
                    <span style="cursor:pointer;" @click="router.replace('/')">欢迎来到华梦幻的站点</span>
                    <div class="toggle-button" @click="toggleCollapse">
                        <el-icon v-if="isCollapse" ><DArrowRight /></el-icon>
                        <el-icon v-else><DArrowLeft /></el-icon>
                    </div>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px':'200px'">
                    <AppMenu :collapse="isCollapse"/>
                </el-aside>
                <el-container>
                    <el-main><router-view/></el-main>
                    <el-footer>
                        Copyright © 2022 zitianqiong@foxmail.com All Rights Reserved.<br/>
                        <a href="https://www.huamenghuan.top">华胥梦幻羽建站</a>
                        备案号：<a href="https://www.beianx.cn/info/352197461143621">黑ICP备2021006633号</a>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup >
import {ref, reactive} from "vue";
import AppMenu from '../components/menu.vue';
import router from "../router/index.js";

// 是否折叠
let isCollapse = ref(false)

const logout = () => {
    window.sessionStorage.clear()
    router.push('login')
}
// 点击按钮，切换菜单的折叠与展开
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
}

</script>
<style scoped lang="scss">
.container{
    height: 100vh;
    width: 100vw;
    .el-header {
        background-color: #363d40;
        // 给头部设置一下弹性布局
        display: flex;
        // 让它贴标左右对齐
        justify-content: space-between;
        // 清空图片左侧padding
        padding-left: 0;
        // 按钮居中
        align-items: center;
        // 文本颜色
        color: #fff;
        // 设置文本字体大小
        font-size: 20px;
        // 嵌套
        > div {
            // 弹性布局
            display: flex;
            // 纵向上居中对齐
            align-items: center;
            // 给文本和图片添加间距，使用类选择器
            span {
                margin-left: 15px;
            }
        }
    }
    .el-aside {
        background-color: #313743;
        .el-menu{
            border-right: none;
        }
    }
    .el-main {
        background-color: #e9edf1;
    }
    .toggle-button{
        // 设置文本大小
        font-size:15px;
        height: 20px;
        // 设置文本颜色
        color:#fff;
        // 设置文本居中
        text-align: center;
        // 设置文本间距
        letter-spacing: 0.2em;
        // 设置鼠标悬浮变小手效果
        cursor:pointer;
    }
}

</style>
