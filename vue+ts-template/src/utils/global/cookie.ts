export function getCookie(name: string = '') {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)

  return arr ? decodeURIComponent(arr[2]) : null
}

export function setCookie(name: string, value: string, expireDays: number) {
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + expireDays)

  document.cookie =
    name +
    '=' +
    escape(value) +
    (expireDays == null ? '' : ';expires=' + expireDate.toUTCString())
}

export function delCookie(name: string) {
  const value = getCookie(name)
  const expire = new Date()
  expire.setTime(expire.getTime() - 1)

  if (value !== null)
    document.cookie = name + '=' + value + ';expires=' + expire.toUTCString()
}

export function delAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)

  if (keys === null) {
    return
  }

  keys.forEach(key => setCookie(key, '', -1))
}
