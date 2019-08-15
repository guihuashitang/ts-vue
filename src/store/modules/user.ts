// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import list from './rrrrrr'

const user = {
  state: {
    token: getToken(),
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state:any, token:any) => {
      state.token = token
    },
    SET_ROLES: (state:any, roles:any) => {
      state.roles = roles
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }:any, userInfo:any) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', 'true')
        setToken('true')
        resolve()
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }:any) {
      return new Promise((resolve, reject) => {
        const data = list.data
        let roles = []
        for (const i in data.menuCodeSet) {
          roles.push(data.menuCodeSet[i])
        }
        commit('SET_ROLES', roles)
        resolve()
      })
    },


    // 登出
    LogOut({ commit, state }:any) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()

      })
    },

    // 前端 登出
    FedLogOut({ commit }:any) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

  }
}

export default user
