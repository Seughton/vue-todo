<template>
  <v-container grid-list-md text-xs-center>
    <p class="display-2">MAKE YOUR OWN TO DO LIST</p>
    <v-layout align-center justify-center row>
      <v-form lazy-validation v-model="valid" ref="form">
        <v-text-field
          :rules="toDoRules"
          v-model="toDoModel"
          @keyup.enter.prevent="addTodo"
          placeholder="I need to..."
          required
        ></v-text-field>
      </v-form>
      <template v-if="edit">
        <v-btn color="info" @click="update">UPDATE</v-btn>
      </template>
      <template v-if="!edit">
        <v-btn :disabled="!valid" color="info" @click="addTodo">Add Todo</v-btn>
      </template>
    </v-layout>
    <v-data-table :items="todos" class="elevation-1" hide-actions hide-headers>
      <template slot="items" slot-scope="props">
        <tr :class="{selected: props.item.done}" :key="props.index">
          <td class="text-xs-left">
            <span class="index-padding">{{props.index + 1}}</span>
            {{props.item.title}}
          </td>
          <td class="text-xs-right">
            <v-btn @click="completeToDo(props.item.done, props.index)" color="success">Done</v-btn>
            <v-btn @click="editToDo(props.item.title, props.index)" color="warning">Edit</v-btn>
            <v-btn @click="removeToDo(props.index)" class="headline" color="error">&times;</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      edit: false,
      valid: false,
      index: -1,
      toDoRules: [
        v => !!v || `Enter yours task`,
        v => /.{5}/.test(v) || `Please enter over 5 symbols :)`
      ],
      toDoModel: ""
    };
  },
  created() {
    this.getTodosFromDB();
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  methods: {
    getTodosFromDB() {
      this.$socket.emit("SOCKET_GET_TODOS_FROM_DB", null, (result, err) => {
        this.$store.dispatch("getTodosFromDB", result);
      });
    },
    editToDo(todo, index) {
      this.toDoModel = todo;
      this.index = index;
      this.edit = true;
    },
    update() {
      if (this.toDoModel !== this.todos[this.index].title) {     
        this.$socket.emit(
          "SOCKET_UPDATE_TODO",
          { id: this.todos[this.index].id, todo: this.toDoModel },
          (result, err) => {
            this.$store.dispatch("update", {
              index: this.index,
              id: this.todos[this.index].id,
              todo: result.todo,
              edit: this.edit,
              done: this.todos[this.index].done
            });
          }
        );
        this.edit = false;
        this.toDoModel = "";
      }
    },
    completeToDo(isDone, index) {
      this.$socket.emit("SOCKET_COMPLETE_TODO", {
        isDone: !isDone,
        id: this.todos[index].id
      });
      this.$store.dispatch("completeToDo", { isDone: !isDone, index: index });
    },
    addTodo() {
      console.log("TODOS IS", this.todos);
      if (this.$refs.form.validate()) {
        this.$socket.emit("SOCKET_ADD_TODO", this.toDoModel, (result, err) => {
          this.$store.dispatch("addTodo", {
            todo: this.toDoModel,
            id: result.id
          });
        });
      }
    },
    removeToDo(index) {
      let key = this.todos[index].id;
      this.$socket.emit("SOCKET_REMOVE_TODO", key);
      this.$store.dispatch("removeToDo", index);
    }
  },
  computed: {
    todos() {
      return this.$store.getters.todos.sort((a, b) => a.id - b.id);
    }
  }
};
</script>
<style>
.delete-bnt {
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
