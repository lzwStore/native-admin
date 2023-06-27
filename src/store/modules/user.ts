import { defineStore } from 'pinia'
import { getStorage, setStorage } from '@/utils/localstorage'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    counter: 99,
    isLogin: !!getStorage('isLogin') || false
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
    },
    setLoginStatus() {
      setStorage('isLogin', true)
      this.isLogin = true
    }
  },
  getters: {
    getUserName: (state) => state.name
  }
})
