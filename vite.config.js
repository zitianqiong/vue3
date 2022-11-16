import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
  // 识别 @ 符号为"./src"目录开始
  resolve: {
    alias: {
      "@": path.resolve("."),
      "~": path.resolve("src"),
    },
  },
  //本地运行配置，以及反向代理配置
  server: {
    host: "localhost",//前端服务器IP
    https: false,//是否启用 http 2
    cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    open: true,//服务启动时自动在浏览器中打开应用
    port: "9010",
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    hmr: true,
    // 传递给 chockidar 的文件系统监视器选项
    watch: {
      ignored:["!**/node_modules/vue3/**"]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',//后端服务器端口号
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
