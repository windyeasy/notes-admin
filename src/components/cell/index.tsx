import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { CellWrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string | ReactNode
  cellRight: string | ReactNode
}

const Cell: FC<IProps> = (props) => {
  const { title = '', cellRight } = props
  return (
    <CellWrapper>
      <div className="cell-left">{title}</div>
      <div className="cell-right">{cellRight}</div>
    </CellWrapper>
  )
}

export default memo(Cell)
