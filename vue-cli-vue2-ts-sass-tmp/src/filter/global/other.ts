export const none = (value: any) => {
  return !value || Number(value) === 0 ? '--' : value
}

export default [
  {
    name: 'rank',
    fn(value: number, page: number, pageCount: number, start = 1) {
      return value + start + (page - 1) * pageCount
    }
  },
  {
    name: 'none',
    fn: none
  },
  {
    name: 'mobile',
    fn(value: string): string {
      return value.slice(0, 3) + '****' + value.slice(7)
    }
  },
  {
    name: 'empty',
    fn(value: string): string {
      return value !== '' && value !== undefined ? value : '无'
    }
  }
]
