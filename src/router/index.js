import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'

import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/search/',
    name: 'SearchEmpty',
    component: Search
  },
  {
    path: '/search/:query',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
