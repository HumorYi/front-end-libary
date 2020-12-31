const ACCESS_TOKEN = 'ACCESS_TOKEN'
const TAOBAO_AUTH_UPDATE_MARK = 'TAOBAO_AUTH_UPDATE_MARK'

// 对操作 key 的方法进行统一处理
const getItem = (key: string) => {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : item
}
const setItem = (key: string, val: any) =>
  sessionStorage.setItem(key, JSON.stringify(val))
const removeItem = (key: string) => sessionStorage.removeItem(key)

// 暴露出去操作 key 的方法
export const getAccessToken = () => getItem(ACCESS_TOKEN)
export const setAccessToken = (val: any) => setItem(ACCESS_TOKEN, val)
export const delAccessToken = () => removeItem(ACCESS_TOKEN)

export const getTaobaoAuthUpdateMark = () => getItem(TAOBAO_AUTH_UPDATE_MARK)
export const setTaobaoAuthUpdateMark = (val: any) =>
  setItem(TAOBAO_AUTH_UPDATE_MARK, val)
export const delTaobaoAuthUpdateMark = () => removeItem(TAOBAO_AUTH_UPDATE_MARK)
