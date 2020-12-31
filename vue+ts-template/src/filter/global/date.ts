const padStartZero = (data: any): string => {
  const strData = String(data)
  return strData.length < 2 ? '0' + strData : strData
}

export default [
  {
    name: 'year',
    fn(value: string): string {
      return value.slice(5)
    }
  },
  {
    name: 'date',
    fn(value: number, splitSymbol = '.'): string {
      // value => seconds
      const date = new Date(value * 1000)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())

      return year + splitSymbol + month + splitSymbol + day
    }
  },
  {
    name: 'datetime',
    fn: (value: any, dateSplitSymbol = '-', timeSplitSymbol = ':'): string => {
      const date = new Date(value)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())
      const hour = padStartZero(date.getHours())
      const minutes = padStartZero(date.getMinutes())
      const seconds = padStartZero(date.getSeconds())

      return (
        year +
        dateSplitSymbol +
        month +
        dateSplitSymbol +
        day +
        ' ' +
        hour +
        timeSplitSymbol +
        minutes +
        timeSplitSymbol +
        seconds
      )
    }
  }
]
