import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import '@/assets/css/tailwind.css'
import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({              
  apiKey: "AIzaSyBWzRFc1iX6MT-9B-94Ug1YTKgk8lCaRSY",
  authDomain: "words-5af8a.firebaseapp.com",
  databaseURL: "https://words-5af8a.firebaseio.com",
  projectId: "words-5af8a",
  storageBucket: "words-5af8a.appspot.com",
  messagingSenderId: "229618348257",
  appId: "1:229618348257:web:9026272a8f986e58"
})

export const db = firebase.firestore()
export const auth = firebase.auth()

import VueDateFns from "vue-date-fns";
Vue.use(VueDateFns);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
