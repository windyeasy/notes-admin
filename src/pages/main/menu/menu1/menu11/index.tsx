import { Card } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Menu11: FC<IProps> = () => {
  return <Card>Menu11</Card>
}

export default memo(Menu11)
