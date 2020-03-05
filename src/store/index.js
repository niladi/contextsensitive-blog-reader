import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    mobile: Vue.prototype.$mobileBreakPoint > window.innerWidth,
    posts: [],
    defaultFontSize: 100,
    noise: {
      period: 500,
      time: 5,
      multiplicator: 1
    },
    speed: {
      multiplicator: 1,
      time: 5
    }
  },
  mutations: {
    setDark (state, payload) {
      state.dark = payload.isDark
    },
    windowResize (state) {
      state.mobile = Vue.prototype.$mobileBreakPoint > window.innerWidth
    },
    setPosts (state, payload) {
      state.posts = payload.posts
    },
    setDefaultFontSize (state, payload) {
      state.defaultFontSize = payload.defaultFontSize
    },
    setNoise (state, {period, time, multiplicator}) {
      state.noise = {
        period: period,
        time: time,
        multiplicator: multiplicator
      }
    },
    setSpeed (state, {period, time, multiplicator}) {
      state.speed = {
        period: period,
        time: time,
        multiplicator: multiplicator
      }
    }
  },
  actions: {
    enableDarkMode ({commit}) {
      commit('setDark', { isDark: true })
    },
    disableDarkMode ({commit}) {
      commit('setDark', { isDark: false })
    },
    toggleDarkMode ({commit, getters}) {
      commit('setDark', { isDark: !getters.isDarkMode })
    },
    toggleResize ({commit}) {
      commit('windowResize')
    },
    updatePosts ({commit}) {
      Vue.prototype.$fetchData('posts')
        .then((response) => commit('setPosts', { posts: response.data }))
    },
    setNoiseAttr ({commit, getters}, {key, value}) {
      let data = getters.getNoise
      if (data.hasOwnProperty(key)) {
        data[key] = value
      } else {
        throw new Error('Key not found in Noise Object')
      }
      commit('setNoise', data)
    },
    setSpeedAttr ({commit, getters}, {key, value}) {
      let data = getters.getSpeed
      if (data.hasOwnProperty(key)) {
        data[key] = value
      } else {
        throw new Error('Key not found in Speed Object')
      }
      commit('setSpeed', data)
    },
    setDefaultFontSize ({commit}, value) {
      commit('setDefaultFontSize', { defaultFontSize: value })
    }
  },
  modules: {},
  getters: {
    isDarkMode (state) {
      return state.dark
    },
    isMobile (state) {
      return state.mobile
    },
    getPosts (state) {
      return state.posts
    },
    getPost: (state, getters) => (id) => getters.getPosts.find(element => element.id === id),
    getNoise (state) {
      return state.noise
    },
    getSpeed (state) {
      return state.speed
    },
    getDefaultFontSize (state) {
      return state.defaultFontSize
    }
  }
})
