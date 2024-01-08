/**
 * 验证是是否undefine或者null
 * @param { any } value
 * @returns Boolean
 */
export function checkValueNotDefined(value: any) {
  return value === null || value === undefined ? false : true
}

/**
 * 验证数组是否不为空
 *
 * @param { any } value
 * @returns {boolean}
 */
export function checkArrayNotEmpty(value: any) {
  return Boolean(Array.isArray(value) && value.length)
}
