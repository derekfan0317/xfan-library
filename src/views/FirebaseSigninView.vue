<template>
  <h1 class="text-center">Firebase Sign in</h1>
  <p class="text-center"><input type="text" placeholder="Email" v-model="email" /></p>
  <p class="text-center"><input type="password" placeholder="Password" v-model="password" /></p>
  <p class="text-center"><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Firebase Login Successful!')
      router.push('/')
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
