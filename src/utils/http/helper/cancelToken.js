import axios from 'axios'
const pendingMap = new Map()

export function assembleData(config) {
  let { url, method, params, data, headers } = config
  data = typeof data === 'string' ? data : JSON.stringify(data)
  return [url, method, JSON.stringify(params), data].join('&')
}

export function addPending(config) {
  const pendingKey = assembleData(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

export function removePending(config) {
  const pendingKey = assembleData(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}
