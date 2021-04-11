import { endZero } from './number'

export const centToRmb = (value: number | string): number | string => {
  const result = Number(value)
  return !isNaN(result) && result !== 0 ? result / 100 : value
}

export const price = (value: number | string): number | string => {
  const result = Number(value)
  return !isNaN(result) && result !== 0 ? '￥' + value : value
}

export const tenThousand = (
  value: number | string,
  symbol = '万',
  bit = 1
): string | number => {
  const result = Number(value)
  return !isNaN(result) && result >= 10000
    ? (result / 10000).toFixed(bit) + symbol
    : value
}

export default [
  {
    name: 'tenThousand',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value: number | string, bit = 1): string | number {
      return tenThousand(value, '万', bit)
    }
  },
  {
    name: 'tenThousandW',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value: number | string, bit = 1): string | number {
      return tenThousand(value, 'W', bit)
    }
  },
  {
    name: 'tenThousandComma',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value: number | string, bit = 1): string | number {
      if (!value) {
        return value
      }

      const [intPart, floatPart] = String(value).split('.')
      // 将整数部分逢三断一加逗号
      const intPartFormat = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

      return intPartFormat + (floatPart ? '.' + floatPart.slice(0, bit) : '')
    }
  },
  {
    name: 'centToRmb',
    fn(value: number | string): number | string {
      return centToRmb(value)
    }
  },
  {
    name: 'price',
    fn(value: number | string): number | string {
      return price(endZero(value))
    }
  },
  {
    name: 'dollar',
    fn(value: number | string): string {
      return '$' + value
    }
  }
]
