import { uploadFile } from '@/services/main/system'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import type { UploadProps } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  uploadProps?: UploadProps
  value?: string
  fileList?: UploadProps['fileList']
  onChange?: (payload: number | string) => void
}

const UploadFile: FC<IProps> = (props) => {
  const [fileList, setFileList] = useState<UploadProps['fileList']>([])

  const {
    uploadProps = {
      maxCount: 1
    }
  } = props

  // 自定义文件上传请求
  const uploadFileRequest: UploadProps['customRequest'] = async (options) => {
    const file = options.file as any
    const fileInfo = {
      uid: file.uid,
      name: file.name,
      state: 'uploading'
    }
    setFileList([fileInfo])
    if (options.file) {
      try {
        const { data, code } = await uploadFile(options.file as Blob)
        if (code === 0) {
          fileInfo.state = 'done'
          useMessageApi()?.success('文件上传成功')
          props.onChange && props.onChange(data.id)
        } else {
          fileInfo.state = 'error'
        }
      } catch (error) {
        console.log(error)
        fileInfo.state = 'error'
      }
      setFileList([fileInfo])
    }
  }
  // 监听fileList的变化修改fileList的值
  useEffect(() => {
    if (props.fileList && props.fileList.length) {
      setFileList(props.fileList)
    }
  }, [props.fileList])
  return (
    <>
      <Upload {...uploadProps} fileList={fileList} customRequest={uploadFileRequest}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
    </>
  )
}

export default memo(UploadFile)
