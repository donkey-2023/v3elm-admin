const state = () => ({
  isCollapse: false // 是否折叠侧边菜单栏
})

const mutations = {
  toggleCollapse(state, data) {
    state.isCollapse = data !== undefined ? data : !state.isCollapse
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
