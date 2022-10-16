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

const app = createApp(App)

useSvgIcons(app)
app.use(store).use(router).use(elementPlus).use(directives).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
