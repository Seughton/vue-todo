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
    <template v-if='edit'>
      <v-btn
        color="info" 
        @click="update">
        UPDATE
      </v-btn>    
    </template>
    <template v-if='!edit'>
      <v-btn    
        :disabled='!valid' 
        color="info" 
        @click="addTodo">
        Add Todo
      </v-btn>    
    </template>
    </v-layout>  
    <v-data-table      
      :items="todos"
      class="elevation-1"      
      hide-actions
      hide-headers
    > 
    <template slot="items" slot-scope="props">      
      <tr :class="{selected: props.item.done}" :key="props.index"> 
        <td class="text-xs-left">
        <span class="index-padding">
          {{props.index + 1}}
        </span>
          {{props.item.title}}      
        </td>
        <td class="text-xs-right">
          <v-btn @click='completeToDo(props.item.done, props.index)' color='success'>Done</v-btn>                 
          <v-btn @click='editToDo(props.item.title, props.index)' color='warning'>Edit</v-btn>
          <v-btn @click="removeToDo(props.index)" class="headline" color="error">&times;</v-btn>
        </td>
      </tr>          
    </template>      
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return {
      edit: false,      
      valid: false,      
      index: -1,
      toDoRules:[              
        v => !!v || `Enter yours task`,
        v => (/.{5}/.test(v) || `Please enter over 5 symbols :)`)      
      ],
      toDoModel: ''
    }
  },
  created() {
    this.getTodosFromDB()
  },  
  methods: {
    async getTodosFromDB(){
      let uli = `http://localhost:3001/todos`;
      await axios.get(uli).then((response) => {
        console.log('response.data',response.data)
        let todos = response.data;
        this.$store.dispatch('getTodosFromDB', todos)   
      })
    },
    editToDo(todo,index){
      this.toDoModel = todo;
      this.index = index;
      this.edit = true     
    },
    update(){   
      let uli = `http://localhost:3001/updateTodo`;
      if(this.toDoModel !== this.todos[this.index].title){       
        axios.put(uli, { data: { index: this.todos[this.index].id, todo: this.toDoModel } })      
        this.$store.dispatch('update', {index: this.index, todo: this.toDoModel})           
        this.edit = false;
        this.toDoModel = ''
      }
    },
    completeToDo(isDone, index){   
      let uli = `http://localhost:3001/doneTodo`;      
      axios.put(uli, { data: {isDone: !isDone, index: this.todos[index].id}});
      this.$store.dispatch('completeToDo',{isDone: !isDone, index: index})
    },
    addTodo() {       
      let uli = `http://localhost:3001/addTodo`;      
      if (this.$refs.form.validate()) {    
        axios.post(uli, {todo: this.toDoModel, id: `${(this.todos[this.todos.length - 1] + 1) || 1}`});
        this.$store.dispatch('addTodo',{todo: this.toDoModel, id: `${(this.todos[this.todos.length - 1] + 1) || 1}`})
      }          
    },
     removeToDo(index) {
      let key = this.todos[index].id; 
      let uli = `http://localhost:3001/deleteTodo`;     
      axios.delete(uli, { data: { index: key } })
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
.index-padding {
  padding-right: 15px;
} 
.selected {
  background-color: rgba(241, 50, 50, 0.801) !important;
}
.v-table__overflow {
  overflow-x: hidden !important;
}
</style>
