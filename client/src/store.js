import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idForToDo: 3,
    todos: []
  },
  mutations: {
    SOCKET_GET_TODOS_FROM_DB(state, payload) {
      state.todos.push(...payload)
    },
    SOCKET_ADD_TODO(state, payload) {     
      state.todos.push({
        id: payload.id,
        title: payload.todo,
        edit: false,
        done: false,
        date: payload.date
      })
    },
    SOCKET_REMOVE_TODO(state, index) {
      let todos = state.todos
      todos.splice(index, 1)
    },
    SOCKET_UPDATE_TODO(state, payload) {
      state.todos.splice(payload.index, 1, { id: payload.id, title: payload.todo, edit: payload.edit, done: payload.done })
    },
    SOCKET_COMPLETE_TODO(state, payload) {
      const todos = state.todos
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
    completeToDo({ commit }, payload) {
      commit('SOCKET_COMPLETE_TODO', payload)
    },
    getTodosFromDB({ commit }, payload) {
      commit('SOCKET_GET_TODOS_FROM_DB', payload)
    }
  },
  getters: {
    todos: state => state.todos,
  }
})
