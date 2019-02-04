<template>
  <div>
    <home></home>
    <!-- <about></about> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Home from './views/Home.vue'
// import About from './views/About.vue'

export default {
  name: 'App',
  components: {
    Home,
    // About
  },
  data () {
    return {
      //
    }
  }
}
</script>
