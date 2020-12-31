import { toDecimal } from '@globalUtils/lib'

export default [
  {
    name: 'earn',
    fn(value: number): string {
      return toDecimal(value, 2)
    }
  },
  {
    name: 'coupon',
    fn(value: number, rate = 100): string {
      return (value > 0 ? '￥' + Math.floor(value / rate) : '暂无') + '券'
    }
  },
  {
    name: 'couponId',
    fn(value: number | string, symbol = '***'): string {
      const strValue = String(value)

      return strValue.slice(0, 5) + symbol + strValue.slice(strValue.length - 5)
    }
  }
]
