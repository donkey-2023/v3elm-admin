import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import useSvgIcons from '@/icons/index'
import directives from './directives/index'
import '@/router/permission'
import AppLoading from './components/AppLoading'
import { debounce } from '@/utils/index'

async function setupApp() {
  // 创建一个用于挂载appLoading组件的div节点
  const $div = document.createElement('div')
  // 将该div节点挂载到html或body上
  const $container = document.documentElement || document.body
  $container.appendChild($div)
  createApp(AppLoading).mount($div)

  const app = createApp(App)
  useSvgIcons(app)
  app.use(store).use(elementPlus).use(directives)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  await initRouter(app)
  // 路由加载完成后,再挂载常规页面
  app.mount('#app')
  // 最后，移除div节点，显示常规页面
  $container.removeChild($div)

  patch()
}

async function initRouter(app) {
  app.use(router)
  // 等待导航初始化完成
  await router.isReady().catch(error => {
    console.log(error) // 捕捉token失效的错误
  })
}
setupApp()

// 解决el-table组件宽或高调整时，报ResizeObserver loop limit exceeded错误
function patch() {
  const _ResizeObserver = window.ResizeObserver
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
      callback = debounce(callback, 16)
      super(callback)
    }
  }
}
