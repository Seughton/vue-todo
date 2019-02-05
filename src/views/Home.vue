<template>  
  <v-container grid-list-md text-xs-center>
    <p class="display-2">MAKE YOUR OWN TO DO LIST</p>
    <v-layout  align-center justify-center row>
    <v-form lazy-validation v-model="valid" ref="form">
    <v-text-field 
      :rules="toDoRules"           
      v-model="toDoModel"      
      @keyup.enter.prevent="addTodo"
      placeholder="I need to..."
      required
    ></v-text-field>
    </v-form>
    <v-btn 
      :disabled='!valid' 
      color="info" 
      @click="addTodo">
      Add Todo
    </v-btn>    
    </v-layout>
    <div v-for="(todo,index) in todos" :key="todo.id">
      <v-layout align-center justify-space-between row fill-height/>
      <v-list>
        <v-input>
          <input 
            v-if="todo.edit" 
            v-model='todo.title'
            @blur="todo.edit = false; $emit('update')"
            @keyup.enter="todo.edit=false; $emit('update')"            
          >          
            <label v-if="!todo.edit"  @click="todo.edit=true">
              {{todo.title}}
            </label>            
          </v-input>   
        </v-list>    
       <v-btn @click="removeToDo(index)" class="headline" color="error">&times;</v-btn> 
       <v-divider light></v-divider>             
      </v-layout>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      valid: true,
      toDoRules:[              
        v => !!v || `Enter yours task`,
        v => (/.{5}/.test(v) || `Please enter over 5 symbols :)`)      
      ],
      toDoModel: ''
    }
  },
  methods: {    
    addTodo() {
      if(this.toDoModel !== '')
      this.$store.dispatch('addTodo',this.toDoModel)          
    },
    removeToDo(index) {
      this.$store.dispatch('removeToDo', index )
    }  
  },
  computed: {   
    todos(){
      return this.$store.getters.todos
    }
  },
};
</script>
<style>
.delete-bnt{
    font-size: 24px;
} 
</style>
