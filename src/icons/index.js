import SvgIcon from '@comps/SvgIcon'

// 全局注册SvgIcon
export default (app) => {
  app.component('svg-icon', SvgIcon)
}

// 全局引入所有的svg文件到body标签下
const svgRequired = require.context('@assets/svg', false, /\.svg$/)

svgRequired.keys().forEach((item) => {
  svgRequired(item)
})
