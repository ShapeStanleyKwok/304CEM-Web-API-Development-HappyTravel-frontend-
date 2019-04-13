import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
require('@styles/styles.scss');

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)


import vueCookies from 'vue-cookies'
Vue.use(vueCookies)


import instance from '@/utils/axios'
Vue.prototype.$http = instance


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')