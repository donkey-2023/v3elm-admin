import loading from './module/elm-loading'
import enter from './module/elm-enter'

const directives = {
  'elm-loading': loading,
  'elm-enter': enter
}

export default {
  install: function (app) {
    Object.keys(directives).forEach((name) => {
      app.directive(name, directives[name])
    })
  }
}
