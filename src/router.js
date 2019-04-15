import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
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
  }, , {
    path: '/destinations',
    name: 'destinations',
    meta: {
      title: 'Happy Travel | Destinations'
    },
    component: () => import('./pages/destinations/Index')
  }, {
    path: '/user',
    name: 'user',
    meta: {
      title: 'Happy Travel | User'
    },
    component: () => import('./pages/user/Index')
  }, {
    path: '/details',
    name: 'details',
    meta: {
      title: 'Happy Travel | Details'
    },
    component: () => import('./pages/details/Index')
  }]
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})




export default router