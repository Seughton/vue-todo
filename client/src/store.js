import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idForToDo: 3,
    todos: []
  },
  mutations: {  
    ADD_TODO(state, payload) {
      state.todos.push({       
        title: payload,
        edit: false,
        done: false,
      })      
    },  
    REMOVE_TODO(state, index) {
      let todos = state.todos
      todos.splice(index, 1)
    },
    UPDATE_TODO(state, payload){
      const todos = state.todos
      todos.splice(payload.index, 1, {title: payload.todo, edit: false, done: false})
    },
    COMPLETE_TODO(state, payload){
      const todos = state.todos
      todos[payload.index].done = !todos[payload.index].done 
    }
  },
  actions: {   
    addTodo({ commit }, payload) {
      commit('ADD_TODO', payload)
    },
    removeToDo({ commit }, index) {
      commit('REMOVE_TODO', index)
    },
    update({ commit }, payload) {           
      commit('UPDATE_TODO', payload)
    },
    completeToDo({ commit }, payload){
      commit('COMPLETE_TODO', payload)
    }
  },
  getters: {   
    todos: state => state.todos.filter((todo) => { return !todo.completed }),    
  }
})
