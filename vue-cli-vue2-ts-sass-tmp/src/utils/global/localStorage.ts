const ACCESS_TOKEN = 'ACCESS_TOKEN'

// 对操作 key 的方法进行统一处理
const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : item
}
const setItem = (key: string, val: any) =>
  localStorage.setItem(key, JSON.stringify(val))
const removeItem = (key: string) => localStorage.removeItem(key)

// 暴露出去操作 key 的方法
export const getAccessToken = () => getItem(ACCESS_TOKEN)
export const setAccessToken = (val: any) => setItem(ACCESS_TOKEN, val)
export const delAccessToken = () => removeItem(ACCESS_TOKEN)
