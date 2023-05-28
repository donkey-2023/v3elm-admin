const state = () => ({
  arr: []
})

const mutations = {
  updateCache(state, { pagePath, data }) {
    const index = state.arr.findIndex(item => item.pagePath === pagePath)
    if (index > -1) {
      state.arr[index] = { adjustedColumns: data, pagePath, key: new Date() }
    } else {
      state.arr.push({ adjustedColumns: data, pagePath, key: new Date() })
    }
  }
}
const actions = {
  updateCache({ commit, rootState }, data) {
    const pagePath = rootState.menu.activeMenu.path
    commit('updateCache', { pagePath, data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
