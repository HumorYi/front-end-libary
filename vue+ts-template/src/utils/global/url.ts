export const urlParamToObj = (url: string) => {
  const obj = {}
  const reg = /([^?&]+)=([^?&]+)/g

  if (url) {
    url.replace(reg, (s: string, v: string, k: string) => {
      obj[v] = decodeURIComponent(k)

      return k + '=' + v
    })
  }

  // 方式二
  /*const params = url.match(reg)

  if (params) {
    params.forEach((param: string) => {
      const results = param.split('=')
      obj[results[0]] = results[1]
    })
  } */

  return obj
}
