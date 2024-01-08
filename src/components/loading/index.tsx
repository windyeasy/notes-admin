import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LoadingWrapper } from './style'
import { Spin } from 'antd'

interface IProps {
  children?: ReactNode
  fullscreen?: boolean
}

const Loading: FC<IProps> = (props) => {
  const { fullscreen = false } = props
  return (
    <LoadingWrapper>
      <Spin size="large" fullscreen={fullscreen} />
    </LoadingWrapper>
  )
}

export default memo(Loading)
