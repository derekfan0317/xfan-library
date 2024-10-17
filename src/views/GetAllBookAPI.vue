<template>
  <div id="app">
    <h1>All Book</h1>

    <pre>{{ jsondata }}</pre>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return { jsondata: null, error: null }
  },
  mounted() {
    this.getAllBookAPI()
  },
  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get('https://getallbooks-sqicjycbga-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book:', error)
        this.error = error
        this.jsondata = null
      }
    }
  }
}
</script>
