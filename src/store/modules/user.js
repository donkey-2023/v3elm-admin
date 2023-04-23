import $http from '@/utils/http/index'
import { USER_INFO } from '@/utils/constant'

const state = () => ({
  userInfo: JSON.parse(localStorage.getItem(USER_INFO)) || {}
})

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
    localStorage.setItem(USER_INFO, JSON.stringify(data))
  },
  clearUserInfo(state) {
    state.userInfo = {}
    localStorage.removeItem(USER_INFO)
  }
}

const actions = {
  getUserInfo({ commit }, params = {}) {
    return new Promise((resovle, reject) => {
      $http
        .post('/getUserInfo', params, { cancelDuplicateRequest: true, loading: true })
        .then(res => {
          commit('setUserInfo', res.user)
          resovle()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
