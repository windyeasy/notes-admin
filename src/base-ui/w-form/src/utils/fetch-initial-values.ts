import { WFormItem } from '../type'

// 获取普通情况下初始化值
export function fetchInitialValues(formItems: WFormItem[]) {
  const initialValues: any = {}
  for (const formItem of formItems) {
    if (!formItem.defaultValueUn) {
      initialValues[formItem.prop] = formItem.initValue ?? ''
    }
  }
  return initialValues
}
