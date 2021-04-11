/* eslint-disable */
const isIEBrowser = (): boolean =>
  typeof window.navigator.msSaveOrOpenBlob === 'function'

const isZero = (val: any): boolean => Number(val) === 0

const isPositiveInteger = (val: any): boolean =>
  isZero(val) || /^[1-9]\d*$/.test(val)

const isNegativeInteger = (val: any): boolean =>
  isZero(val) || /^-[1-9]\d*$/.test(val)

const isInteger = (val: any): boolean =>
  isPositiveInteger(val) || isNegativeInteger(val)

const isPositiveNumber = (val: any): boolean =>
  isZero(val) || /^(0|[1-9]\d*)(\.\d+)?$/.test(val)

const isNegativeNumber = (val: any): boolean =>
  isZero(val) || /^-(0|[1-9]\d*)(\.\d+)?$/.test(val)

const isPercent = (val: any): boolean =>
  isPositiveNumber(val) && val >= 0 && val <= 100

const isNullObject = (val: {}): boolean => JSON.stringify(val) === '{}'

const isMobile = (val: any): boolean => /^1[3456789]\d{9}$/.test(val)

const isEmail = (val: any): boolean =>
  /^[\w.-]+@([a-zA-Z\d-]+\.)+[a-zA-Z\d]{2,4}$/.test(val)

const isAliPayAccount = (val: any): boolean => isMobile(val) || isEmail(val)

const isMobileClient = (): boolean =>
  Boolean(
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  )

const isIPhone = (): boolean => /iphone/gi.test(window.navigator.userAgent)

const isIPhoneX = (): boolean => isIPhone() && window.screen.height >= 812

const isIOS = () =>
  /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent)

const isAndroid = (): boolean =>
  window.navigator.userAgent.includes('Android') ||
  window.navigator.userAgent.includes('Linux')

const isUrl = (val: any): boolean =>
  /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/i.test(
    val
  )

const isPhone = (val: any): boolean =>
  /^((\d{8})|(\d{3, 4})-(\d{7,8})|(\d{3, 4})-(\d{7,8})-(\d{1, 4})|(\d{7,8})-(\d{1, 4}))$/.test(
    val
  )

const isPositiveInt = (val: any): boolean => /^[1-9]\d*$/.test(val)

const isNonnegativeInt = (val: any): boolean => /^[1-9]\d*|0$/.test(val)

const isFloat = (val: any): boolean =>
  /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(val)

const isFloatFixedTwo = (val: any): boolean => /^\d+(\.\d{1,2})?$/.test(val)

const isPostcode = (val: any): boolean => /^[1-9]\d{5}(?!\d)$/.test(val)

const isLetterOrNum = (val: any): boolean => /^[a-zA-Z\d]+$/.test(val)

const isRoom = (val: any): boolean =>
  /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/.test(val)

const isIDCard = (val: any): boolean => /^\d{15}|\d{18}$/.test(val)

const isRangeFileSize = (size: number, limit: number | string) => {
  const base = 1024
  const unitType = {
    B: 0,
    KB: 1,
    MB: 2,
    GB: 3,
    TB: 4
  }

  const limitStr = String(limit).toUpperCase()

  if (typeof limit === 'string') {
    const limitUnit = limitStr.slice(-2)

    if (Object.prototype.hasOwnProperty.call(unitType, limitUnit)) {
      const limitSize = Number(limitStr.slice(0, -2))
      return limitSize * Math.pow(base, unitType[limitUnit]) >= size
    }

    throw new Error(`${limitUnit} 单位不存在`)
  }

  return limit >= size
}

const isXML = (elem: XMLDocument | HTMLElement) =>
  elem.ownerDocument || elem.documentElement.nodeName.toLowerCase() !== 'html'

export {
  isIEBrowser,
  isInteger,
  isPositiveInteger,
  isNegativeInteger,
  isPositiveNumber,
  isNegativeNumber,
  isPercent,
  isNullObject,
  isMobile,
  isEmail,
  isAliPayAccount,
  isMobileClient,
  isIPhone,
  isIPhoneX,
  isIOS,
  isAndroid,
  isUrl,
  isPhone,
  isPositiveInt,
  isNonnegativeInt,
  isFloat,
  isFloatFixedTwo,
  isPostcode,
  isLetterOrNum,
  isRoom,
  isIDCard,
  isRangeFileSize,
  isXML
}
/* eslint-enable */
