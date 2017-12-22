/**
 * Created by Aaronzm on 2017/7/2 0002.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from './api/ApiService'

Vue.use(Vuex)
/** i18n **/
let store = new Vuex.Store({
  modules: {
    ApiService
  }
})
store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    title: '首页'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    setNavigationBarTitle (state, payload) {
      document.querySelector('title').innerHTML = payload.title
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})
export default store
