import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idForToDo: 3,
    todos: [
      {        
        title: "Project A",
        edit: false,
        done: false
      },
      {       
        title: "Project b",
        edit: false,
        done: false
      }
    ]
  },
  mutations: {  
    ADD_TODO(state, payload) {
      state.todos.push({       
        title: payload,
        edit: false,
        done: false
      })      
    },  
    REMOVE_TODO(state, index) {
      let todos = state.todos
      todos.splice(index, 1)
    }
  },
  actions: {
    getTodo({ commit }, todo) {
      commit('GET_TODO', todo)
    },
    addTodo({ commit }, payload) {
      commit('ADD_TODO', payload)
    },
    removeToDo({ commit }, index) {
      commit('REMOVE_TODO', index)
    }
  },
  getters: {   
    todos: state => state.todos.filter((todo) => { return !todo.completed }),    
  }
})
