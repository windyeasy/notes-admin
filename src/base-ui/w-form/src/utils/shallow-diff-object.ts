import { AnyObject } from 'antd/lib/_util/type'
// 两个对象key不能交叉
export function shallowDiffObjectKeys(object1: AnyObject, object2: AnyObject) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  for (const key of keys1) {
    return keys2.includes(key)
  }
  return false
}
/**
 * 判断两个对象是否有交叉的值
 */
export function shallowDiffObject(object1: AnyObject, object2: AnyObject) {
  const keys = Object.keys(object1)
  for (const key of keys) {
    const val1 = object1[key]
    const val2 = object2[key]
    if (val1 === val2) {
      return true
    }
  }
  return false
}
