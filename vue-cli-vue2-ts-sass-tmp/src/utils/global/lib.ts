export function removeDomByClassName(className: string): void {
  className = className
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('.')

  if (className[0] !== '.') {
    className = '.' + className
  }

  const doms = [...document.querySelectorAll(className)]

  doms.forEach(dom => dom.parentElement && dom.parentElement.removeChild(dom))
}

export const extendObject = (output: {}, input: {}): {} => {
  for (const key in input) {
    output[key] = input[key]
  }

  return output
}

export const extendObjectByOrigin = (output: {}, input: {}, origin: {}): {} => {
  for (const key in input) {
    output[input[key]] = origin[key]
  }

  return output
}

export const filterObjectKeys = (obj: {}, filters: string[]): {} => {
  const result = {}

  for (const key in obj) {
    if (filters.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  }

  return result
}

export const toDecimal = (value: number, bit = 1, rate = 100): string => {
  if (value >= 0 && value < 1) {
    return '0.' + ''.padEnd(bit, '0')
  }

  const ret = String(value / rate).split('.')
  const intPrice = Number(ret[0])
  let decimalPrice = ret[1] || ''
  const decimalPriceLen = decimalPrice.length

  if (decimalPriceLen > bit) {
    decimalPrice = decimalPrice.slice(0, bit)
  } else if (decimalPriceLen < bit) {
    decimalPrice = decimalPrice.padEnd(bit, '0')
  }

  return intPrice + '.' + decimalPrice
}

export const lineBreakToBrTag = (str: string, symbol = '<br>'): string =>
  str.replace(/\r\n|\r|\n/gi, symbol)

export const replaceBreak = (str: string, symbol = ''): string =>
  str.replace(
    /^(\s*(<br\s*\/?>|\r\n|\n\r|\r|\n)\s*)*|(\s*(<br\s*\/?>|\r\n|\n\r|\r|\n)\s*)*$/gi,
    symbol
  )

/* eslint-disable */
export const urlToATag = (str: string, target = '_blank'): string =>
  str.replace(
    /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi,
    (url, ...args) => {
      return args[0]
        ? '<a href="' + url + '" target="' + target + '">' + url + '</a>'
        : url
    }
  )
/* eslint-enable */

export const strReverse = (str: string) =>
  str
    .split('')
    .reverse()
    .join('')

export const decimalToBinaryToDecimals = (num: number | string): number[] => {
  const binaryNum = Number(num).toString(2)
  const len = binaryNum.length
  const result = []

  for (let i = 0; i < len; i++) {
    binaryNum[i] === '1' && result.push(Math.pow(2, len - 1 - i))
  }

  return result.reverse()
}

export const cloneJSON = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const equalJSON = (a: {} | [], b: {} | []): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

export const getPascalName = (name: string): string => {
  const names = name.split('-')
  let retName = ''

  names.forEach((name: string) => {
    retName += name[0].toUpperCase() + name.slice(1)
  })

  return retName
}

export const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

export const getObjectURL = (file: File) => {
  let url = null
  if (window['createObjectURL'] != undefined) {
    // basic
    url = window['createObjectURL'](file)
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }

  return url
}

export const textareaInsertContent = (
  textarea: HTMLTextAreaElement,
  insertContent: string
): void => {
  // IE
  if (document['selection']) {
    textarea.focus()
    const sel = document['selection'].createRange()
    sel.text = insertContent
    sel.select()
  }
  // 主流浏览器
  else if (textarea.selectionStart || textarea.selectionStart === 0) {
    // 得到光标前的位置
    const startPos = textarea.selectionStart
    // 得到光标后的位置
    const endPos = textarea.selectionEnd
    // 在加入数据之前获得滚动条的高度
    const restoreTop = textarea.scrollTop
    const insertEndPos = startPos + insertContent.length

    textarea.value =
      textarea.value.substring(0, startPos) +
      insertContent +
      textarea.value.substring(endPos, textarea.value.length)

    //如果滚动条高度大于0
    if (restoreTop > 0) {
      textarea.scrollTop = restoreTop
    }

    textarea.selectionStart = insertEndPos
    textarea.selectionEnd = insertEndPos
    textarea.focus()
  } else {
    textarea.value += insertContent
    textarea.focus()
  }
}

const getTenPower = (power = 3) => Math.pow(10, power)

export const numberPrecision = (data: number, multiplied = 1, power = 3) => {
  const base = getTenPower(power)

  return (data * base * multiplied) / base
}

export const minusPrecision = (a: number, ...args: number[]): number => {
  const base = getTenPower()
  let result = a * base

  args.forEach((item: number) => {
    result -= item * base
  })

  return result / base
}

export const plusPrecision = (a: number, ...args: number[]): number => {
  const base = getTenPower()
  let result = a * base

  args.forEach((item: number) => {
    result += item * base
  })

  return result / base
}

export const getObjectKeyFnVal = (obj: {}, key: string, ...args: any[]) => {
  const field = obj[key]
  return typeof field === 'function' ? field.apply(obj, args) : field
}

export const getUrlParam = () => {
  const param = {}

  location.search
    .slice(1)
    .split('&')
    .forEach((item: string) => {
      const hash = item.split('=')
      param[hash[0]] = hash[1]
    })

  return param
}
