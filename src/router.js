import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    meta: {
      title: 'Happy Travel | Home'
    },
    component: () => import('./pages/home/Index')
  }, {
    path: '/sign',
    name: 'sign',
    meta: {
      title: 'Happy Travel | Sign'
    },
    component: () => import('./pages/sign/Index')
  }]
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})




export default router