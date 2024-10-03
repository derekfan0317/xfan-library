<template>
  <div id="app">
    <h1>Book Counter API</h1>

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
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-sqicjycbga-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.jsondata = null
      }
    }
  }
}
</script>
