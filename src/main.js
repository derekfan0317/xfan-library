// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import './assets/main.css'
// import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(router)
app.mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCgvC7yx33eGHIWqP7Z-NaviRT6gAbvQGc',
  authDomain: 'week7-xinyi-ff117.firebaseapp.com',
  projectId: 'week7-xinyi-ff117',
  storageBucket: 'week7-xinyi-ff117.appspot.com',
  messagingSenderId: '411295725488',
  appId: '1:411295725488:web:f3fa157c667edaaa608875'
}

// Initialize Firebase
initializeApp(firebaseConfig)
