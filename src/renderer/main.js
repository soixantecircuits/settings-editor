import Vue from 'vue'
import axios from 'axios'
import VueSpacebroClient from 'vue-spacebro-client'
import settings from '@/lib/settings'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import locale from 'iview/src/locale/lang/en-US'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueSpacebroClient, settings.service.spacebro, store)

Vue.use(iView, { locale })

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
