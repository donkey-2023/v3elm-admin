import $http from '@/utils/http/index'
import { TOKEN, EFFECTIVE_TIME } from '@/utils/constant'
import router from '@/router'

const state = () => ({
  token: localStorage.getItem(TOKEN) || '',
  logouting: false,
  deviceType: 'pc' // 设备类型
})

const mutations = {
  setToken(state, token) {
    state.token = token
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(EFFECTIVE_TIME, Date.now())
  },
  clearToken(state) {
    state.token = ''
    state.logouting = true
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(EFFECTIVE_TIME)
  },
  setDeviceType(state, data) {
    state.deviceType = data
  }
}

const actions = {
  login({ commit }, params = {}) {
    return new Promise((resovle, reject) => {
      $http
        .post('/login', params, { cancelDuplicateRequest: true, loading: false })
        .then(res => {
          commit('setToken', res.token)
          router.replace('/')
          resovle()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout({ commit }) {
    commit('clearToken')
    commit('menu/clearMenuList', null, { root: true })
    commit('menu/clearActiveMenu', null, { root: true })
    commit('user/clearUserInfo', null, { root: true })
    router.replace('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
