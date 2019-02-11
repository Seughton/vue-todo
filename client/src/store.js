import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idForToDo: 3,
    todos: []
  },
  mutations: {
    SOCKET_GET_TODOS_FROM_DB(state, payload){      
      state.todos.push(payload);  
    },  
    SOCKET_ADD_TODO(state, payload) {    
      state.todos[0].push({
        id: 0 ,    
        title: payload.todo,
        edit: false,
        done: false,
      })      
    },  
    SOCKET_REMOVE_TODO(state, index) {         
      let todos = state.todos[0]     
      todos.splice(index, 1)      
    },
    SOCKET_UPDATE_TODO(state, payload){      
      state.todos[0].splice(payload.index, 1, {id: payload.index,title: payload.todo, edit: false, done: false})
    },
    SOCKET_COMPLETE_TODO(state, payload){           
      const todos = state.todos[0]
      todos[payload.index].done = !todos[payload.index].done 
    }
  },
  actions: {   
    addTodo({ commit }, payload) {
      commit('SOCKET_ADD_TODO', payload)
    },
    removeToDo({ commit }, index) {     
      commit('SOCKET_REMOVE_TODO', index)
    },
    update({ commit }, payload) {         
      commit('SOCKET_UPDATE_TODO', payload)
    },
    completeToDo({ commit }, payload){
      commit('SOCKET_COMPLETE_TODO', payload)
    },
    getTodosFromDB({ commit }, payload){      
      commit('SOCKET_GET_TODOS_FROM_DB', payload)
    }
  },
  getters: {   
    todos: state => state.todos[0],    
  }
})
