/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 验证工具
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime: 2020-04-25 13:19:45
 */

/* eslint-disable */
var UTIL_VERIFY = {
  /**
   * 是否 IE 浏览器
   * @return {Boolean}
   */
  isIEBrowser: function () {
    return window.navigator && window.navigator.msSaveOrOpenBlob
  },
  /**
   * 是否包含横杆
   * @param {String} val
   * @return {Boolean}
   */
  isIncludeCrossbarChar: function (val) {
    let str_val = String(val)
    return str_val && str_val.includes('-')
  },
  /**
   * 是否正整数
   * @param {String} val
   * @return {Boolean}
   */
  isInteger: function (val) {
    return this.isPositiveNumber(val) && Number.isSafeInteger(val)
  },
  /**
   * 是否百分比
   * @param {String} val
   * @return {Boolean}
   */
  isPercent: function (val) {
    return this.isPositiveNumber(val) && val >= 0 && val <= 100
  },
  /**
   * 是否正数
   * @param {Object} val
   * @return: {Boolean}
   */
  isPositiveNumber: function (val) {
    return !this.isIncludeCrossbarChar(val) && typeof val === 'number' && !isNaN(val) && val >= 0
  },
  /**
   * 获取数据类型 {}
   * @param {Object} val
   * @return: {Boolean}
   */
  getDataType: function (val) {
    return Object.prototype.toString.call(val).slice(8, -1)
  },
  /**
   * 是否数组 {}
   * @param {Object} val
   * @return: {Boolean}
   */
  isArray: function (val) {
    return this.getDataType(val) === 'Array'
  },
  /**
   * 是否对象 {}
   * @param {Object} val
   * @return: {Boolean}
   */
  isObject: function (val) {
    return this.getDataType(val) === 'Object'
  },
  /**
   * 是否空对象 {}
   * @param {Object} val
   * @return: {Boolean}
   */
  isNullObject: function (val) {
    return !this.isObject(val) || JSON.stringify(val) === '{}'
  },
  /**
   * 手机号码验证
   * @param {String} val
   * @return: {Boolean}
   */
  isMobile: function (val) {
    return /^1[3456789]\d{9}$/.test(val)
  },
  /**
   * 邮箱验证
   * @param {String} val
   * @return: {Boolean}
   */
  isEmail: function (val) {
    return /^[\w.-]+@([a-zA-Z\d-]+\.)+[a-zA-Z\d]{2,4}$/.test(val)
  },
  /**
   * 支付宝账号验证
   * @param {String} val
   * @return: {Boolean}
   */
  isAliPayAccount: function (val) {
    return this.isMobile(val) || this.isEmail(val)
  },
  /**
   * IPhone 验证
   * @return: {Boolean}
   */
  isIPhone: function () {
    return /iphone/gi.test(window.navigator.userAgent)
  },
  /**
   * IPhoneX 及 后续的机型验证
   * @return: {Boolean}
   */
  isIPhoneX: function () {
    return this.isIPhone() && window.screen.height >= 812
  },
  /**
   * IOS 系统验证
   * @return: {Boolean}
   */
  isIOS: function () {
    return (
      window &&
      window.navigator &&
      window.navigator.userAgent &&
      /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent)
    )
  },
  /**
   * android 系统验证
   * @return: {Boolean}
   */
  isAndroid: function () {
    return (
      (window &&
        window.navigator &&
        window.navigator.userAgent &&
        window.navigator.userAgent.indexOf('Android') !== -1) ||
      window.navigator.userAgent.indexOf('Linux') !== -1
    )
  },
  /**
   * 链接 验证
   * @return: {Boolean}
   */
  isUrl: function (val) {
    return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/i.test(val)
  },
  /**
   * 固话 验证
   * @return: {Boolean}
   */
  isPhone: function (val) {
    return /^((\d{8})|(\d{3, 4})-(\d{7,8})|(\d{3, 4})-(\d{7,8})-(\d{1, 4})|(\d{7,8})-(\d{1, 4}))$/.test(val)
  },
  /**
   * 正整数（不包含0） 验证
   * @return: {Boolean}
   */
  isPositiveInt: function (val) {
    return /^[1-9]\d*$/.test(val)
  },
  /**
   * 非负整数（包含0） 验证
   * @return: {Boolean}
   */
  isNonnegativeInt: function (val) {
    return /^[1-9]\d*|0$/.test(val)
  },
  /**
   * 浮点数 验证
   * @return: {Boolean}
   */
  isFloat: function (val) {
    return /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(val)
  },
  /**
   * 小数点后不超过两位 验证
   * @return: {Boolean}
   */
  isFloatFixedTwo: function (val) {
    return /^\d+(\.\d{1,2})?$/.test(val)
  },
  /**
   * 邮编 验证
   * @return: {Boolean}
   */
  isPostcode: function (val) {
    return /^[1-9]\d{5}(?!\d)$/.test(val)
  },
  /**
   * 字母或数字 验证
   * @return: {Boolean}
   */
  isLetterOrNum: function (val) {
    return /^[a-zA-Z\d]+$/.test(val)
  },
  /**
   * 10位，第一个不能为0，可以输入中文，字母，数字 验证
   * @return: {Boolean}
   */
  isRoom: function (val) {
    return /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/.test(val)
  },
  /**
   * 身份证 验证
   * @return: {Boolean}
   */
  isIDCard: function (val) {
    return /^\d{15}|\d{18}$/.test(val)
  }
}
/* eslint-enable */
