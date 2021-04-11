export const endZero = (value: number | string, bit = 2) => {
  const result = Number(value)
  return !isNaN(result)
    ? result.toFixed(bit).replace(/(\.0+$)|(?:(?!(\.\d+))0+$)/, '')
    : value
}

export const percent = (value: number | string, bit = 2): number | string => {
  const result = Number(value)
  return !isNaN(result) && Number(value) !== 0
    ? endZero(value, bit) + '%'
    : value
}

export default [
  {
    name: 'zero',
    fn: endZero
  },
  {
    name: 'percent',
    fn: percent
  },
  {
    name: 'decimals',
    fn(value: number | string, bit = 2): string {
      const result = Number(value)
      return !isNaN(result) && result > 0 ? result.toFixed(bit) : '0'
    }
  }
]
