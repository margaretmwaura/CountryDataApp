import Vue from 'vue';
window.Vue = Vue;

import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false
Vue.use(VueToast);
require('./assets/sass/app.scss');

import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

Vue.use(VueTelInput);

new Vue({
  render: h => h(App),
}).$mount('#app')
