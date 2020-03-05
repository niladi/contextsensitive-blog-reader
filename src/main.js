import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.prototype.$mobileBreakPoint = 1264

Vue.prototype.$apiLink = 'https://wp.mciot.niladi.de/wp-json/wp/v2/'
Vue.prototype.$fetchData = function (path, params) {
  return axios.get(this.$apiLink + path, {params: params})
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
