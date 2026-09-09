import { defineStore } from "pinia"
import { reqLogin, reqUserInfo } from '@/api/user/index'
import type { loginFormData } from '@/api/user/type'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routers'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN() || '',
      menuRoutes: constantRoutes,
      username: '',
      avatar: ''
    }
  },
  actions: {
    //用户登录的方法
    //async函数返回的是一个promise对象,所以我们可以使用async await来获取结果
    async userLogin(data: loginFormData) {
      //登录之后,发请求,处理返回结果
      let result = await reqLogin(data)
      //登录成功,将来要把token存储到本地存储中
      if (result.code === 200) {
        this.token = (<string>result.data.token)
        SET_TOKEN((<string>result.data.token))
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.data.message || '登录失败'))
      }
    },
    async userInfo() {
      //获取用户信息
      let result = await reqUserInfo()

      if (result.code !== 200) {
        return Promise.reject(new Error(result.message || '获取用户信息失败'))
      }

      this.username = result.data.checkUser.username
      this.avatar = result.data.checkUser.avatar
      return result
    },
    getters: {
    }
  }
})

export default useUserStore

