import { Card } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Menu2: FC<IProps> = () => {
  return <Card>Menu2</Card>
}

export default memo(Menu2)
