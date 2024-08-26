<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="login-container">
          <h2>Login</h2>
          <form @submit.prevent="login">
            <div class="row mb-3">
              <label for="username">username:</label>
              <input type="text" id="username" v-model="username" />
            </div>
            <div class="row mb-3">
              <label for="password">password:</label>
              <input type="password" id="password" v-model="password" />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Login</button>
            </div>
          </form>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isAuthenticated = ref(false)
const router = useRouter()

const login = () => {
  console.log('Login method triggered')
  if (username.value === 'xinyi' && password.value === '34245421') {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    console.log('Redirecting to Home')
    router.push({ name: 'Home' })
  } else {
    errorMessage.value = 'incorrect username or password'
    console.log('Login failed')
  }
}
</script>

<style></style>
