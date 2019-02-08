import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idForToDo: 3,
    todos: []
  },
  mutations: {
    GET_TODOS_FROM_DB(state, payload){     
      state.todos.push(payload);  
    },  
    ADD_TODO(state, payload) { 
      state.todos[0].push({
        id: 1,    
        title: payload,
        edit: false,
        done: false,
      })      
    },  
    REMOVE_TODO(state, index) {         
      let todos = state.todos[0]     
      todos.splice(index, 1)      
    },
    UPDATE_TODO(state, payload){
      console.log("COME HERE")
      
      state.todos[0].splice(payload.index, 1, {id: '🔧',title: payload.todo, edit: false, done: false})
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
      console.log("GO NEXT")         
      commit('UPDATE_TODO', payload)
    },
    completeToDo({ commit }, payload){
      commit('COMPLETE_TODO', payload)
    },
    getTodosFromDB({ commit }, payload){      
      commit('GET_TODOS_FROM_DB', payload)
    }
  },
  getters: {   
    todos: state => state.todos[0],    
  }
})
