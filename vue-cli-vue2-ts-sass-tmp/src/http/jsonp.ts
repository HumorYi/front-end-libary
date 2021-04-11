export default (url: string, timeout = 500) => {
  return new Promise(resolve => {
    // 避免并发时回调名称冲突
    const callback = 'jsonCallBack' + Date.now()
    window[callback] = (result: any) => resolve(result)

    const head = document.getElementsByTagName('head')[0]
    const JSONP = document.createElement('script')
    JSONP.src = `${url}&callback=${callback}`

    head.appendChild(JSONP)

    setTimeout(() => head.removeChild(JSONP), timeout)
  })
}
