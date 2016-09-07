<template>
<div>
  <img src="./assets/logo.png" alt="" class="logo">
  <h1>{{msg}}</h1>
  <comp-a></comp-a>
  <comp-b></comp-b>
  <counter><counter>
</div>
</template>

<script>
import CompA from './components/a.vue'
import CompB from './components/b.vue'
import Counter from './components/counter.vue'

export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    CompA,
    CompB,
    Counter
  }
}
</script>

<style>

</style>
