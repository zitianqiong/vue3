import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import store from "./store"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {get, postJson} from './api'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style/common.scss'

const app = createApp(App)
app.config.globalProperties.$get = get
app.config.globalProperties.postJson = postJson
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus).use(router).use(store)
app.mount('#app')
