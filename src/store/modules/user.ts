import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import type { UserState } from './types/type'
import {
  loginResponseData,
  loginFormData,
  userInfoReponseData,
} from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routers'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN() || '',
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    //用户登录的方法
    //async函数返回的是一个promise对象,所以我们可以使用async await来获取结果
    async userLogin(data: loginFormData) {
      //登录之后,发请求,处理返回结果
      let result: loginResponseData = await reqLogin(data)
      // console.log(result)
      //登录成功,将来要把token存储到本地存储中
      if (result.code === 200) {
        this.token = <string>result.data
        SET_TOKEN(<string>result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data || '登录失败'))
      }
    },
    async userInfo() {
      //获取用户信息
      let result: userInfoReponseData = await reqUserInfo()
      // console.log(result)
      if (result.code !== 200) {
        return Promise.reject(new Error(result.message || '获取用户信息失败'))
      }

      this.username = result.data.name
      this.avatar = result.data.avatar
      return result
    },
    // 退出登录
    async userLogout() {
      let result: any = await reqLogout()
      console.log(result)

      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message || '退出登录失败'))
      }
    },
    getters: {},
  },
})

export default useUserStore
