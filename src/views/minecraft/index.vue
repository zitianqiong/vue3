<template>
    <div>
        <h3>这是minecraft页面 ,请在服务器选项框中粘贴此地址</h3>
        <p>www.huamenghuan.top:25565<el-button @click="copy">点击复制</el-button></p>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
const copy = () => {
    let eInput = document.createElement('input')
    eInput.value = "www.huamenghuan.top:25565"
    document.body.appendChild(eInput)
    eInput.select() //选择对象
    let copyText = document.execCommand('Copy') //执行浏览器的复制命令
    eInput.style.display = 'none'
    if (copyText) ElMessage.success('复制成功')
}
</script>
