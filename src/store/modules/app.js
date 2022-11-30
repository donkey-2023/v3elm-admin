import $http from '@/utils/http/index'
import { TOKEN, START_TIME } from '@/utils/constant'
import router from '@/router'

const state = () => ({
  token: localStorage.getItem(TOKEN) || ''
})

const mutations = {
  setToken(state, token) {
    state.token = token
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(START_TIME, Date.now())
  },
  clearToken(state) {
    state.token = ''
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(START_TIME)
  }
}

const actions = {
  login({ commit }, params) {
    return new Promise((resovle, reject) => {
      $http
        .post('/login', params, { cancelDuplicateRequest: true, loading: true })
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
    router.replace('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
