import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { WFormItem, WFormPublicProps } from './type'
import WForm from './core/index'
import { WFormProxyService } from './service/proxy-service'
import { WFormItemType, extendFormItems } from './templates'
import type { DataNode } from 'antd/lib/tree'

export interface WBaseFormProps extends WFormPublicProps {
  children?: ReactNode
  proxyService?: WFormProxyService
}
interface SelectOption {
  label: string
  value: any
}

// WFormItem扩展类型
export interface WBaseFormItem extends WFormItem<WFormItemType> {
  options?: SelectOption[] | DataNode[] | any
  asyncOptions?: any
  placeholder?: string
}
const WBaseForm: FC<WBaseFormProps> = (props) => {
  return (
    <>
      <WForm extendFormItems={extendFormItems} {...props} />
    </>
  )
}

export default memo(WBaseForm)
