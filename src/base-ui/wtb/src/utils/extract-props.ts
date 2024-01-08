import { WtbProps } from '../core'

/**
 *
 * 提取配置项参数
 */
export function extractProps(props: WtbProps) {
  const { api = '', requestConfig = {}, responseConfig, pagination = true } = props

  if (!requestConfig) {
    new Error('Parameter Error: Wtb组件props的type=api时必须传入requestConfig')
  }
  if (!responseConfig) {
    new Error('Parameter Error: Wtb组件props的type=api时必须传入responseConfig')
  }

  let { method = 'GET' } = requestConfig!

  const { dataIndex, totalIndex = '' } = responseConfig!
  const reg = /^\.|\.$/
  if (reg.test(dataIndex)) {
    handleValueError('dataIndex', dataIndex)
  }
  if (reg.test(totalIndex)) {
    handleValueError('totalIndex', totalIndex)
  }
  method = method.toUpperCase()
  const dataIndexList = dataIndex.split('.')
  const totalIndexList = totalIndex ? totalIndex.split('.') : []

  return {
    api,
    method,
    dataIndexList,
    totalIndexList,
    pagination
  }
}

export function handleValueError(prop: string, value: string) {
  new Error(`Value Error: ${prop} value error: ${value}`)
}
