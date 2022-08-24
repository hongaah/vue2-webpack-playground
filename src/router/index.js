/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// fix: 解决 ElementUI 导航栏中的 vue-router 在 3.0 版本以上重复点击路径报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/Home',
    name: 'Home',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/',
    meta: { auth: true, keepAlive: true },
    redirect: '/Home',
  },
  {
    path: '/ElementPage',
    name: 'ElementPage',
    meta: { auth: true, keepAlive: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ElementPage.vue'),
  },
  {
    path: '/LifeCircle',
    name: 'LifeCircle',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/LifeCircle.vue'),
  },
  {
    path: '/BasicVue',
    name: 'BasicVue',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/BasicVue.vue'),
  },
  {
    path: '/BasicVueComponent',
    name: 'BasicVueComponent',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/BasicVueComponent.vue'),
  },
  {
    path: '/BasicJs',
    name: 'BasicJs',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/BasicJs.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Axios',
    name: 'Axios',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/Axios.vue'),
  },
  {
    path: '/PageNotFound',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue'),
  },
  {
    path: '/CompositionAPI',
    name: 'CompositionAPI',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/CompositionAPI.vue'),
  },
  {
    path: '/ClassStyle',
    name: 'ClassStyle',
    meta: { auth: true, keepAlive: true },
    component: () => import('../views/ClassStyle/ClassStyle.vue'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.auth)) {
    if (to.path === '/Login') {
      if (!token) {
        next()
      } else {
        next({ name: 'Home' })
      }
    } else {
      if (!token) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  } else {
    next({ name: '/PageNotFound' })
  }
  // 清除定时器
  if (from.path === '/' && window.timer) {
    clearInterval(window.timer)
  }
})

export default router
