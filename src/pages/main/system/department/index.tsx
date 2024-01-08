import PageContent from '@/base-ui/page-content'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { contentConfig } from './config/content.config'

interface IProps {
  children?: ReactNode
}

const Department: FC<IProps> = () => {
  return (
    <>
      <PageContent contentConfig={contentConfig} />
    </>
  )
}

export default memo(Department)
