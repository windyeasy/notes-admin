import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { DemoWrapper } from './style'
import UploadFile from '@/base-ui/upload-file'

interface IProps {
  children?: ReactNode
}

const Demo: FC<IProps> = () => {
  return (
    <DemoWrapper>
      <UploadFile
        onChange={(value) => {
          console.log(value)
        }}
      />
    </DemoWrapper>
  )
}

export default memo(Demo)
