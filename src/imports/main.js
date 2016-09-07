var Vue = require('vue')
var App = require('./app.vue')

console.log(111)
new Vue({
  el: '#app',
  components: {
    app: App
  }
})
