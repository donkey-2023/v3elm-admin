import loading from './module/elm-loading'

const directives = {
  'elm-loading': loading
}

export default {
  install: function (app) {
    Object.keys(directives).forEach((name) => {
      app.directive(name, directives[name])
    })
  }
}
