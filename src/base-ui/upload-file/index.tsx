import { ACCOUNT_TOKEN } from '@/pages/login/service/constants'
import { BASE_URL } from '@/services/config'
import { localCache } from '@/utils/cache'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadProps } from 'antd'

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  uploadProps?: UploadProps
  value?: string | any
  onChange?: (payload: number | string) => void
}

const UploadFile: FC<IProps> = (props) => {
  const token = localCache.getCache(ACCOUNT_TOKEN)
  const {
    uploadProps = {
      name: 'file',
      action: BASE_URL + '/file/upload',
      headers: {
        authorization: 'Bearer ' + token
      },
      maxCount: 1
    }
  } = props
  const onChange: UploadProps['onChange'] = (info) => {
    console.log(info)
    if (info.file.status === 'done') {
      useMessageApi()?.success('文件上传成功')
      // 设置id
      props.onChange && props.onChange(info.file.response.data.id)
    } else if (info.file.status === 'error') {
      useMessageApi()?.error(`${info.file.name} 文件删除失败.`)
    }
  }
  return (
    <>
      <Upload {...uploadProps} onChange={onChange}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
    </>
  )
}

export default memo(UploadFile)
