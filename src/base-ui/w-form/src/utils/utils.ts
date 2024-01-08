import { ExtendFormItem, VisibleIfInfoType, VisibleIfType } from '../type'
import { shallowDiffObject, shallowDiffObjectKeys } from './shallow-diff-object'

export function handleConfig(config: any) {
  return config ?? {}
}

export type TypeToRenderReturnType = {
  [key in string]: ExtendFormItem['render']
}
// 将拓展类型转换为一个对象，有利于查询读取
export function mapTypeIndexToRender(extendFormItems: ExtendFormItem[]) {
  const obj: TypeToRenderReturnType = {}
  for (const item of extendFormItems) {
    obj[item.type] = item.render
  }
  return obj
}
type VisibleIfDiffType = 'hidden' | 'show' | 'disabled'
// visibleIf diff
export function visibleIfDiff(visibleIf: VisibleIfType, formData: any): VisibleIfDiffType {
  // console.log(formData, '进入了formData')
  if (Object.keys(visibleIf).length) {
    const { hidden, show, disabled } = visibleIf
    /**
     * hidden: {menuType: 1 },
     * disabled: {menuType: 2}
     */
    if (hidden && show && shallowDiffObjectKeys(hidden, show)) {
      new Error('visibleIf Error: hidden和show不能同时存在同一个key ')
      return 'show'
    }
    if (hidden && disabled && shallowDiffObject(hidden, disabled)) {
      new Error('visibleIf Error: hidden和disabled不能存在同样的key value ')
      return 'show'
    }
    if (hidden && Object.keys(hidden).length) {
      const keys = Object.keys(hidden)
      for (const key of keys) {
        // 到数据发生改变，需要隐藏表单，就隐藏表单
        if (formData[key] === hidden[key]) {
          return 'hidden'
        }
      }
    }
    if (disabled && Object.keys(disabled).length) {
      const keys = Object.keys(disabled)
      for (const key of keys) {
        // 到数据发生改变，需要隐藏表单，就隐藏表单
        if (formData[key] === disabled[key]) {
          return 'disabled'
        }
      }
    }
    if (show && Object.keys(show).length) {
      const keys = Object.keys(show)
      for (const key of keys) {
        // 到数据发生改变，需要隐藏表单，就隐藏表单
        if (formData[key] !== show[key]) {
          return 'hidden'
        }
      }
    }
  }
  return 'show'
}

// 比对改变的值否visibleIfInfo的的值
export function visibleIfInfoDiffByKey(modifyValue: any, visibleIfInfo: VisibleIfInfoType) {
  const key = Object.keys(modifyValue)[0]
  const keys = Object.keys(visibleIfInfo)
  for (const newKey of keys) {
    const { show, hidden, disabled } = visibleIfInfo[newKey]
    if (
      (hidden && hidden[key] !== undefined) ||
      (show && show[key] !== undefined) ||
      (disabled && disabled[key] !== undefined)
    ) {
      return true
    }
  }
  return false
}
