import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/',
});

Vue.use(VueAxios, instance)

