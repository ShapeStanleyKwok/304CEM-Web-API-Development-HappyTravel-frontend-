import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import instance from '@/utils/axios'

import {
  locale,
  Message
} from 'iview';
import lang from 'iview/dist/locale/en-US'
require('iview/dist/styles/iview.css');
require('@styles/styles.scss');

Vue.config.productionTip = false


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

/**
 * iview
 * 
 */

locale(lang);
Vue.prototype.$Message = Message
// Vue.component('Message', Message);



Vue.prototype.$http = instance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')