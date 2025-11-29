import App from './App'
// import {
// 	BASE_URL,
// 	request
// } from './utils/request2.js'

// main.js
import uView from "uview-ui";
Vue.use(uView);

import request from './utils/index.js'
Vue.prototype.$request = request

import passkeyborad from "@/components/yzc-paykeyboard/yzc-paykeyboard.vue";
Vue.component('passkeyborad', passkeyborad)

import uParse from '@/components/u-parse/u-parse.vue'
Vue.component('uParse', uParse)

import common from './utils/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;

import {
	filters
} from './utils/formatWeek.js'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// Vue.prototype.request = request
import myPlugins from './utils/plugins.js'
Vue.use(myPlugins)

// import VueCompositionAPI from '@vue/composition-api'
// Vue.use(VueCompositionAPI)

const app = new Vue({
	...App
})
app.$mount()
// #endif

// Vue.prototype.BASE_URL = BASE_URL
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif