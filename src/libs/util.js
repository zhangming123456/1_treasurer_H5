'use strict'
import queryString from 'querystring'
import md5 from 'md5'

let exports = {
  queryString, md5
}

/**
 * 判读是否是微信客户端
 * @return true - 微信客户端打开; false - 其他浏览器打开页面
 */
function is_wechat_client () {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

exports.is_wechat_client = is_wechat_client

function sign (secretKey, params) {
  if (!params) return ''
  try {
    let [arr, str] = [[], '']
    for (let k in params) {
      arr.push(k)
    }
    arr.sort()
    for (let v of arr) {
      str += `${v}${params[v]}`
    }
    let sb = str.replace(/(&|=|undefined|null)/g, '')
    return md5(secretKey + sb).toUpperCase()
  } catch (e) {
    return ''
  }
}

exports.sign = sign

var arr = []

var getProto = Object.getPrototypeOf

var slice = arr.slice

var concat = arr.concat

var push = arr.push

var indexOf = arr.indexOf

var class2type = {}

var toString = class2type.toString

var hasOwn = class2type.hasOwnProperty

var fnToString = hasOwn.toString

var ObjectFunctionString = fnToString.call(Object)

var support = {}

exports.isArray = Array.isArray

function isBoolean (arg) {
  return typeof arg === 'boolean'
}

exports.isBoolean = isBoolean

function isNull (arg) {
  return arg === null
}

exports.isNull = isNull

function isNullOrUndefined (arg) {
  return arg === null || arg === undefined
}

exports.isNullOrUndefined = isNullOrUndefined

function isEqualToString (value, other) {
  return JSON.stringify(value) === JSON.stringify(other)
}

exports.isEqualToString = isEqualToString

function isNumber (arg) {
  return typeof arg === 'number'
}

exports.isNumber = isNumber

function isNumberOfNaN (arg) {
  if (arg) {
    arg = Number(arg)
  }
  return typeof arg === 'number' && !isNaN(arg)
}

exports.isNumberOfNaN = isNumberOfNaN

function isString (arg) {
  return typeof arg === 'string'
}

exports.isString = isString

function trim (x) {
  try {
    return x.replace(/^\s+|\s+$/gm, '')
  } catch (e) {
    return x
  }
}

exports.trim = trim

function isJsonString (arg) {
  let json = trim(arg)
  if (!!json && isString(json)) {
    try {
      JSON.parse(json)
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

exports.isJsonString = isJsonString

function isSymbol (arg) {
  return typeof arg === 'symbol'
}

exports.isSymbol = isSymbol

function isUndefined (arg) {
  return arg === undefined
}

exports.isUndefined = isUndefined

function isRegExp (re) {
  return binding.isRegExp(re)
}

exports.isRegExp = isRegExp

function isObject (arg) {
  return arg !== null && typeof arg === 'object'
}

exports.isObject = isObject

function isDate (d) {
  return binding.isDate(d)
}

exports.isDate = isDate

function isFunction (arg) {
  return typeof arg === 'function'
}

exports.isFunction = isFunction

function isPlainObject (obj) {
  var proto, Ctor

  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  proto = getProto(obj)

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    return true
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
  return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
}

exports.isPlainObject = isPlainObject

function isPrimitive (arg) {
  return arg === null ||
    typeof arg !== 'object' && typeof arg !== 'function'
}

exports.isPrimitive = isPrimitive

// exports.isBuffer = Buffer.isBuffer;

function pad (n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10)
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec']

// 26 Feb 16:19:34
function timestamp (text) {
  var d = new Date()
  var time = [pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())].join(':')
  return [d.getDate(), months[d.getMonth()], time].join(' ')
}

exports.timestamp = timestamp

/**
 * 判断是否为非空对象
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject (obj) {
  try {
    var name
    for (name in obj) {
      return true
    }
    return false
  } catch (e) {
    return false
    console.log('非对象')
  }
}

exports.isEmptyObject = isEmptyObject

/**
 * 判断是否为非空值
 * @param value
 * @returns {boolean}
 */
function isEmptyValue (value) {
  try {
    if (!value) {
      return false
    } else if (isString(value)) {
      return !!value
    } else if (Array.isArray(value)) {
      return value && value.length > 0
    } else if (isObject(value)) {
      return isEmptyObject(value)
    }
  } catch (e) {
    return false
    console.log('判断是否为非空值出差', value)
  }
}

exports.isEmptyValue = isEmptyValue

function isFalse (arg) {
  if (isString(arg) && arg.trim() === '') {
    return arg.trim()
  }
  if (arg === 'false' || arg === false || arg === null) {
    return false
  } else if (arg === 'undefined') {
    return undefined
  } else if (arg === 'true') {
    return true
  } else if (arg === 'null') {
    return null
  } else if (arg === 'NaN') {
    return NaN
  } else {
    return arg
  }
}

exports.isFalse = isFalse
// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments))
}

export default exports
