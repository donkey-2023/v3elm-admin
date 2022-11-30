import { createStore } from 'vuex'
import app from './modules/app'

export default createStore({
  modules: {
    app
  },
  getters: {
    token: state => state.app.token
  }
})
