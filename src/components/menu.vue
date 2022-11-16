<template>
    <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            default-active="1" router
            text-color="#fff"
            :collapse="isCollapse" :collapse-transition="false">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>主页</span>
            </template>
            <el-menu-item index="/main">主页</el-menu-item>
            <el-menu-item index="/">home</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/minecraft">
            <el-icon><SwitchFilled /></el-icon>
            <span>minecraft</span>
        </el-menu-item>
        <el-menu-item index="/doc">
            <el-icon><document /></el-icon>
            <span>文档</span>
        </el-menu-item>
        <el-sub-menu index="4">
            <template #title>
                <el-icon><setting /></el-icon>
                <span>设置</span>
            </template>
            <el-menu-item index="/setting">设置</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'

export default{
    name:"AppMenu",
    components:{
        IconMenu
    },
    props: {
        isCollapse: {
            type: Boolean,
        },
    },
    setup(props, context){
    }
}

</script>
