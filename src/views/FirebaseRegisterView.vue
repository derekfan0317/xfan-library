<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1 class="text-center">Create an account</h1>
      <div class="mb-3">
        <input type="text" placeholder="Email" v-model="email" class="form-control" />
      </div>
      <div class="mb-3">
        <input type="password" placeholder="Password" v-model="password" class="form-control" />
      </div>
      <div class="mb-6">
        <label for="role" class="form-label">Role:</label>
        <select class="form-select text-canter" id="role" v-model="role" required>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
      </div>

      <p class="text-center"><button @click="register">Save to Firebase</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const auth = getAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      return updateProfile(user, {
        //update role
        displayName: role.value
      })
    })
    .then(() => {
      console.log('Firebase Register Successful!')
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<style></style>
