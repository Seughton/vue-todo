<template>  
  <v-app>
  <v-container fluid> 
    <v-layout  align-center justify-center>
      <v-flex shrink xs12 sm4 align-self-center text-xs-center>  
      <v-btn append to='/' color="info" block>MAIN</v-btn>
      </v-flex>
      <v-flex shrink xs12 offset-xs1 sm4 align-self-center text-xs-center>  
      <v-btn append to='/home' block color="info">TODO</v-btn>
      </v-flex>
    </v-layout>
    <router-view></router-view>
    </v-container> 
  </v-app> 
</template>

<script>
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'

export default {
  name: 'App',
  components: {
    Home,
    MainPage
  }  
}
</script>