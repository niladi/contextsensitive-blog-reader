import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List'
import Settings from '../views/Settings'
import Post from '../views/Post'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'List' }
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
