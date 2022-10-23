import LocalLoading from './module/local-loading'
import Enter from './module/enter'

const directives = {
  'local-loading': LocalLoading,
  'elm-enter': Enter
}

export default {
  install: function (app) {
    Object.keys(directives).forEach(name => {
      app.directive(name, directives[name])
    })
  }
}
