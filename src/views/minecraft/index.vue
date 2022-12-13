<template>
  <div>
    <h3>这是minecraft页面 ,请在服务器选项框中粘贴此地址</h3>
    <p>www.huamenghuan.top
      <el-button @click="copy" type="primary">点击复制</el-button>
    </p>
    <p>www.huamenghuan.top:25566
      <el-button @click="copy(25566)" type="primary">点击复制</el-button>
    </p>
    <p>www.huamenghuan.top:25567
      <el-button @click="copy(25567)" type="primary">点击复制</el-button>
    </p>
  </div>
</template>

<script setup>
import {ElMessage} from 'element-plus'

const copy = (val) => {
  let eInput = document.createElement('input')
  eInput.value = "www.huamenghuan.top" + val ? ":" + val : null
  document.body.appendChild(eInput)
  eInput.select() //选择对象
  let copyText = document.execCommand('Copy') //执行浏览器的复制命令
  eInput.style.display = 'none'
  if (copyText) ElMessage.success('复制成功')
}
</script>
