<template>
  <div id="app" class="container">
    <input class="form-control" v-model="newToDo" @keyup.enter="addToDo" placeholder="I need to...">
    <button class="btn btn-primary" @click="addToDo">Add Todo</button>
    <!-- <GetTodo v-for="(todo, index) in todos" :todo="todo" :remove='removeToDo(index)' :key="todo.id"></GetTodo> -->
    <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
      <li>
          <input 
            v-if="todo.edit" 
            v-model='todo.title'
            @blur="todo.edit = false; $emit('update')"
            @keyup.enter="todo.edit=false; $emit('update')"            
          >
          <div v-else>
            <label @click="todo.edit=true"> {{todo.title}} </label>
          </div>
      </li>    
      <div class="delete-bnt" @click="removeToDo(index)">&times;</div>
    </div>
  </div>
</template>

<script>
import GetTodo from "../components/GetToDo.vue";

export default {
  components: {
    GetTodo
  },
  data() {
    return {
      editedTodo: '',
      newToDo: "",
      idForToDo: 3,
      todos: [
        {
          id: 1,
          title: "Project A",
          edit: false,
          done: false
        },
        {
          id: 2,
          title: "Project b",
          edit: false,
          done: false
        }
      ]
    };
  },
  methods: {
    addToDo() {
      if (this.newToDo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForToDo,
        title: this.newToDo,
        edit: false,
        done: false
      });
      this.newToDo = "";
      this.idForToDo++;
    },
    removeToDo(index) {
      this.todos.splice(index, 1);
    },
    editToDo(todo) {
      console.log(index)
       this.editedTodo = todo;
    }
  },
  
};
</script>
