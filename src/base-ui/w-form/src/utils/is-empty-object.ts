import { AnyObject } from 'antd/lib/_util/type'

export function isObjectEmpty(objectName?: AnyObject) {
  return objectName ? Object.keys(objectName).length === 0 : false
}
