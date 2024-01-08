import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Wtb from './core'
import type { WtbProps } from './core'
import type { WColumType } from './type'
import { TbType, extendProps } from './templates'

export type WBaseType<T = any> = WColumType<T, TbType>[]

export interface WBaseTableProps extends WtbProps {
  children?: ReactNode
  wcolumns: WBaseType
}

const WBaseTable: FC<WBaseTableProps> = (props) => {
  return (
    <Wtb
      responseConfig={{ dataIndex: 'data.list', totalIndex: 'data.total' }}
      {...props}
      extendProps={extendProps}
    />
  )
}

export default memo(WBaseTable)
