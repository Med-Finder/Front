import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'

import { Auth0Plugin } from './auth'
import { domain, clientId } from '../auth_config.json'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC__Br0NHA46iaSzrJDMid6I2m8VHm8vEQ'
  },
  installComponents: true
})

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
