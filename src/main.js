import Vue from 'vue'

import firebase from 'firebase'
import VueFirestore from 'vue-firestore';

import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSearch, faCopy, faSave, faTimes, faSlidersH, faExchangeAlt, faSignOutAlt, faCheck, faWrench, faCog, faGlobe, faCircle, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faSearch, faCopy, faSave, faTimes, faSlidersH, faExchangeAlt, faSignOutAlt, faCheck, faWrench, faCog, faGlobe, faCheck, faCircle, faArrowLeft, faArrowRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app = '';
let config = {
  apiKey: "AIzaSyAgEgrTeAheXSQRuNQQwggXQac3GUvlQx0",
  authDomain: "convert-viapulsa.firebaseapp.com",
  databaseURL: "https://convert-viapulsa.firebaseio.com",
  projectId: "convert-viapulsa",
  storageBucket: "convert-viapulsa.appspot.com",
  messagingSenderId: "435658965295",
  appId: "1:435658965295:web:0e3d63d5694e305417e1da"
};
firebase.initializeApp(config);

export const db = firebase.firestore()
Vue.use(VueFirestore);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});