import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@views/login/index'
import Demo from '@views/demo/index'

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // }
  {
    path: '/',
    name: 'Demo',
    component: Demo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
