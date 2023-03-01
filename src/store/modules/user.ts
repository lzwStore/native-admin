import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    counter: 99,
    isLogin: false
  }),
  actions: {
    increment () {
      this.counter++
    },
    decrement () {
      this.counter--
    },
    doubleCounter () {
      this.counter *= 2
    }
  },
  getters: {
    getUserName: (state) => state.name
  }
})
