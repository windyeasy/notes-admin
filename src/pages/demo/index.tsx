import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { DemoWrapper } from './style'
// import UploadFile from '@/base-ui/upload-file'
import MDEditor from '@uiw/react-md-editor'
interface IProps {
  children?: ReactNode
}

const Demo: FC<IProps> = () => {
  const [value, setValue] = React.useState('**Hello world!!!**')
  return (
    <DemoWrapper>
      <MDEditor
        value={value}
        onChange={(value) => {
          if (typeof value === 'string') {
            setValue(value)
          }
        }}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </DemoWrapper>
  )
}

export default memo(Demo)
