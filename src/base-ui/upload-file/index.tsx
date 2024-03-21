import React, { memo, useEffect, useState } from 'react'
import { Button, Modal, Upload } from 'antd'
import { uploadFile } from '@/services/main/system'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import type { FC, ReactNode } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface IProps {
  children?: ReactNode
  uploadProps?: UploadProps
  value?: string
  fileList?: UploadProps['fileList']
  onChange?: (payload: number | string) => void
}
const getBase64 = (file: FileType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
)

function showUploadButton(listType: UploadProps['listType']) {
  switch (listType) {
    case 'picture-card':
      return uploadButton
    default:
      return <Button icon={<UploadOutlined />}>选择文件</Button>
  }
}

const UploadFile: FC<IProps> = (props) => {
  const [fileList = [], setFileList] = useState<UploadProps['fileList']>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const {
    uploadProps = {
      maxCount: 1
    }
  } = props

  // 自定义文件上传请求
  const uploadFileRequest: UploadProps['customRequest'] = async (options) => {
    const file = options.file as any
    const fileInfo: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'uploading'
    }
    setFileList([fileInfo])
    // 上传
    if (options.file) {
      try {
        const { data, code } = await uploadFile(options.file as Blob)
        if (code === 0) {
          fileInfo.status = 'done'
          fileInfo.url = data.path
          useMessageApi()?.success('文件上传成功')
          props.onChange && props.onChange(data.id)
        } else {
          fileInfo.status = 'error'
        }
      } catch (error) {
        console.log(error)
        fileInfo.status = 'error'
      }
      setFileList([fileInfo])
    }
  }

  const maxCount = uploadProps.maxCount ?? 1
  // 处理文件预览
  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  // 监听fileList的变化修改fileList的值
  useEffect(() => {
    if (props.fileList && props.fileList.length) {
      setFileList(props.fileList)
    }
  }, [props.fileList])

  return (
    <>
      <Upload
        {...uploadProps}
        fileList={fileList}
        customRequest={uploadFileRequest}
        onPreview={handlePreview}
      >
        {fileList.length >= maxCount ? null : showUploadButton(uploadProps.listType)}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default memo(UploadFile)
