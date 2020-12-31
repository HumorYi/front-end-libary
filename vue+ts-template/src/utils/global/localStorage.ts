const PROMOTION_CODE = 'PROMOTION_CODE'

// 对操作 key 的方法进行统一处理
const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : item
}
const setItem = (key: string, val: any) =>
  localStorage.setItem(key, JSON.stringify(val))
const removeItem = (key: string) => localStorage.removeItem(key)

// 暴露出去操作 key 的方法
export const getPromotionCode = () => getItem(PROMOTION_CODE)
export const setPromotionCode = (val: any) => setItem(PROMOTION_CODE, val)
export const delPromotionCode = () => removeItem(PROMOTION_CODE)
