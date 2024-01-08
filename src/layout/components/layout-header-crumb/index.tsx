import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderCrumbWrapper } from './style'
import CrumbLeft from './c-cpns/crumb-left'
import CrumbRight from './c-cpns/crumb-right'

interface IProps {
  children?: ReactNode
}

const LayoutHeaderCrumb: FC<IProps> = () => {
  return (
    <HeaderCrumbWrapper>
      <CrumbLeft />
      <CrumbRight />
    </HeaderCrumbWrapper>
  )
}

export default memo(LayoutHeaderCrumb)
