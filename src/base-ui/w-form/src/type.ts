import type { ColProps, FormProps } from 'antd'
import type { Rule } from 'antd/es/form'
import type { ReactNode } from 'react'
import { WFormProxyService } from './service/proxy-service'
import { TypeToRenderReturnType } from './utils/utils'
import type { UploadProps } from 'antd'
type AnyObject = {
  [index: string]: any
}
export interface VisibleIfType {
  hidden?: AnyObject
  show?: AnyObject
  disabled?: AnyObject
}
export interface VisibleIfInfoType {
  [index: string]: VisibleIfType
}
interface AutoSizeType {
  minRows: number
  maxRows: number
}
export interface FollowFieldsChangeModifyValueType {
  followKey: string // 跟踪字段索引
  followKeyValue: any // 跟踪字段索引的值
  modifyValue: any // 修改当前字段值
}
export interface WFormItem<T = string> {
  type: T
  prop: string
  label?: string
  initValue?: any
  colConfig?: ColProps
  defaultValueUn?: boolean // 默认值是否未定义
  handleHidden?: any // 通过条件处理隐藏
  // 隐式处理参数
  handleParams?: (values: any) => any
  rules?: Rule[]
  labelCol?: ColProps
  wrapperCol?: ColProps
  visibleIf?: VisibleIfType
  render?: (formItem: WFormItem) => ReactNode
  autoSize?: AutoSizeType | boolean
  min?: number
  max?: number
  disabled?: boolean
  defaultValue?: number
  defaultChecked?: boolean
  checkable?: boolean
  // 跟踪字段变化修改值
  followFieldsChangeModifyValue?: FollowFieldsChangeModifyValueType[]
  // 设置高度
  height?: string | number
  uploadProps?: UploadProps
  [key: string]: any // 添加使用别的类型进行扩展
}

export interface ExtendFormItem<T = WFormItem> {
  type: string // 'input'
  render: (formItem: T) => ReactNode
}

export interface WFormUiConfig {
  formConfig?: FormProps
  colConfig?: ColProps
}

// 分组类型
export interface WGroupsType {
  formItemsProps: string[]
  renderWrapper: (props: { children: ReactNode; key: string | number }) => ReactNode
}
export interface WFormPublicProps {
  mode?: 'normal' | 'group'
  groups?: WGroupsType[]
  formItems: WFormItem[]
  formname: string
  proxyService?: WFormProxyService
  uiConfig?: WFormUiConfig
}

export interface WFormComPublicProps {
  formItems: WFormItem[]
  colConfig?: any
  formItemsInfo: TypeToRenderReturnType
}
