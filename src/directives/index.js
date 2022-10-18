import LocalLoading from './module/local-loading'
import EnterKey from './module/enter-key'

const directives = {
  'local-loading': LocalLoading,
  'enter-key': EnterKey
}

export default {
  install: function (app) {
    Object.keys(directives).forEach((name) => {
      app.directive(name, directives[name])
    })
  }
}
