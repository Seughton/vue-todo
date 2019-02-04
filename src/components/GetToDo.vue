
<template>
  <div id="get-todo" class="container">
      <!-- <p>ToDo:</p>    -->
      <p>{{todo.project}}</p>  
      <p>{{todo.title}}</p>  
      <button></button>
      <hr>
      
      <!-- <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>    -->
  </div>
</template>
<script>
    export default{        
        props: ['todo'],
        methods: {
           
            getTodo(e){
                this.$store.dispatch('getTodo', e.target.value)
            },
            addTodo(){
                this.$store.dispatch('addTodo')
                this.$store.dispatch('clearTodo')
            },
            smth(){
                console.log('asdasd')
            }
        },
        computed: {
            newTodo(){
                return this.$store.getters.newTodo
            },         
        }
    }
</script>