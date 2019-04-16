import Vue from 'vue'
import Vuex from 'vuex'
import * as Types from '@types'
import Utils from '@utils/utils'
import axios from '@utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      comment: "/api/comment/{id}",
      destination: "/api/destination/{id}",
      file: "/api/file",
      self: "/api",
      user: {
        authorization: "/api/user/authorization",
        register: "/api/user",
        userInfo: "/api/user/{id}"
      }
    },
    userId: '',
    userInfo: {}
  },
  getters: {
    isLogin: state => {
      return !Utils.isEmptyObj(state.userInfo)
    }
  },
  mutations: {
    [Types.SIGN_OUT](state) {
      state.userId = ''
      state.userInfo = {}
    },
    [Types.SET_USER_ID](state, payload) {
      state.userId = payload._id || ''
    },
    [Types.SET_USER_INFO](state, payload) {
      state.userInfo = payload.userInfo || {}
    },
    [Types.SET_SERVER_URLS](state, payload) {
      state.api = payload.api || {}
    }
  },
  actions: {
    /**
     * @action getUserInfo
     */
    getUserInfo(ctx, payload) {
      ctx.commit(Types.SET_USER_ID, payload)
      // fetch userInfo
      axios.get(`/api/user/${payload._id}`)
        .then(res => {
          ctx.commit(Types.SET_USER_INFO, {
            userInfo: res.data
          })
        }, err => {
          console.log(err)
          console.log('request error')
        })
    },
    /**
     * @action getServerURLS
     */
    getServerUrls({
      commit
    }) {
      axios.get('/api').then(api => {
        commit(Types.SET_SERVER_URLS, {
          api
        })
      }, err => {
        console.log(err)
        console.log('request error')
      })
    }
  }
})