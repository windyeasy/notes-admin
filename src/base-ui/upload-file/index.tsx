import React, { memo, useEffect, useState } from 'react'
import { Button, Modal, Upload } from 'antd'
import { getFileInfos, uploadFile } from '@/services/main/system'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import type { FC, ReactNode } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface IProps {
  children?: ReactNode
  uploadProps?: UploadProps
  value?: string
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
    },
    value = ''
  } = props
  // 通过接口获取图片列表
  const getFileListByApi = () => {
    if (value) {
      getFileInfos(value).then((res) => {
        const { data } = res
        const newFileList: UploadProps['fileList'] = data.map((item: any) => ({
          url: item.url,
          name: item.filename,
          status: 'done',
          uid: item.id
        }))
        setFileList(newFileList)
      })
    }
  }
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
          fileInfo.uid = data.id
          useMessageApi()?.success('文件上传成功')
        } else {
          fileInfo.status = 'error'
        }
      } catch (error) {
        console.log(error)
        fileInfo.status = 'error'
      }
      const newFileList = [...fileList]
      newFileList.push(fileInfo)
      props.onChange && props.onChange(newFileList.map((item) => item.uid).join(','))
      setFileList(newFileList)
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
  // 处理文件改变
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)
  // 监听fileList的变化修改fileList的值
  useEffect(() => {
    if (props.value) {
      getFileListByApi()
    }
  }, [props.value])

  return (
    <>
      <Upload
        {...uploadProps}
        fileList={fileList}
        customRequest={uploadFileRequest}
        onPreview={handlePreview}
        onChange={handleChange}
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
