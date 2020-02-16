import Vue from 'vue'
import VueRouter from 'vue-router'

import PharmaLayout from "../layouts/Pharma.vue";

import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'

import Dashboard from "../pages/pharmacy/Dashboard.vue"

import {connectedOnly} from "./guards";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
		path: '/pharmacy',
		component: PharmaLayout,
		beforeEnter: connectedOnly,
		children: [
			{
				path: 'dashboard',
				name: 'dashboard_pharma',
				component: Dashboard,
			}
		]
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
