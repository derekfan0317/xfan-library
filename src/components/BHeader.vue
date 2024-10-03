<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">AddBook</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active"
            >Get Book Count</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/Weather" class="nav-link" active-class="active">Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active"
            >Count Book API</router-link
          >
        </li>
        <li>
          <button v-if="isAuthenticated" @click="logout" class="btn btn-secondary">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
const auth = getAuth()
const isAuthenticated = ref(false)
console.log('Firebase Auth initialized:', auth)

const router = useRouter()
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user
  })
})
const logout = () => {
  signOut(getAuth())
    .then(() => {
      isAuthenticated.value = false
      router.push('/FireLogin')
      console.log('User logged out successfully')
    })
    .catch((error) => {
      console.error('Error: ', error)
    })
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
