<template>
  <div id="app" class="container">   
    <input class="form-control" v-model="newTask"  @keyup.enter="addToDo" placeholder="I need to...">
    <button class="btn btn-primary" @click="addToDo">Add Todo</button>
    <GetTodo v-for="todo in todos" :todo='todo' :key='todo.id'></GetTodo>

  </div>
</template>

<script>
import GetTodo from '../components/GetToDo.vue'

export default {
  
  components: {
    GetTodo,
  },
  data(){
    return { 
      newTask: '',
      todos: [
      {
      title: 'Todo A',
      project: 'Project A',
      done: false,
      },
      {
      title: 'Todo B',
      project: 'Project B',
      done: true,
      }, 
      {
      title: 'Todo C',
      project: 'Project C',
      done: false,
      }, 
      {
      title: 'Todo D',
      project: 'Project D',
      done: false,
      }, 
      {
      title: 'Todo D',
      project: 'Project D',
      done: false,
      }, 
      {
      title: 'Todo D',
      project: 'Project D',
      done: false,
      }, 
      {
      title: 'Todo D',
      project: 'Project D',
      done: false,
      }],
        }
  },
  methods: {
    addToDo: () => {
      console.log(this.$data.newTask)
    let task = this.newTask.trim();
			if (task) {        
				this.todos.push({
            title: 'Todo',
            project: task,
            done: false,
          });
				this.newTask = "";
				}
    }
  }
 
}
</script>
