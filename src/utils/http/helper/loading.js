import { startFullScreenLoading, stopFullScreenLoading } from '../../index'

let requestNum = 0

export function showLoading() {
  requestNum++ == 0 && startFullScreenLoading()
}

export function hideLoading() {
  requestNum > 0 && --requestNum == 0 && stopFullScreenLoading()
}
