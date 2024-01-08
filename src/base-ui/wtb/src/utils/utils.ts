import { ColumnType, ColumnsType } from 'antd/es/table'
import { ExtendPropType, WColumType } from '../type'

export function handleExtendProps(prop: WColumType<any>, extendProps: ExtendPropType[]) {
  let newProp: ColumnType<any> = {}
  for (const typeProp of extendProps) {
    if (prop.type === typeProp.type) {
      newProp = { ...prop }
      if (typeProp.customConfigRender) {
        newProp.render = typeProp.customConfigRender(prop)
      } else {
        newProp.render = typeProp.render
      }
      // 删除上面的type属性
      Reflect.deleteProperty(newProp, 'type')
    }
  }
  return newProp
}

export function propsListToColumns(
  propsList: WColumType<any>[],
  extendProps: ExtendPropType[] = []
) {
  const columns: ColumnsType<any> = []
  for (const prop of propsList) {
    if (prop.type) {
      columns.push(handleExtendProps(prop, extendProps))
    } else {
      const newProp = { ...prop }
      if (newProp.customConfigRender) {
        Reflect.deleteProperty(newProp, 'customConfigRender')
      }
      columns.push(newProp)
    }
  }
  return columns
}

// 获取表单里面的列表和total
export function fetchListAndTotal(res: any, dataIndex: string[], totalIndex: string[]) {
  let list = res
  let total = res
  if (dataIndex.length > 0) {
    for (const key of dataIndex) {
      list = list[key]
    }
  }
  if (totalIndex.length > 0) {
    for (const key of totalIndex) {
      total = total[key]
    }
  } else {
    total = 0
  }
  return {
    list,
    total
  }
}
