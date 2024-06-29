import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { EditWrapper } from './style'
import { Button, Card, Col, Form, Input, Row, Select, Switch } from 'antd'
import UploadFile from '@/base-ui/upload-file'

import MDEditor from '@uiw/react-md-editor'
import { useNavigate, useParams } from 'react-router-dom'
import { editArticle, fetchArticleDetail } from '../service'
import { useMessageApi } from '@/utils/global-ant-proxy'

interface IProps {
  children?: ReactNode
}

const NoteEdit: FC<IProps> = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const navigate = useNavigate()
  // 通过菜单类型，隐藏对应的操作框
  const [type, setType] = useState(1)
  // 文件回显

  const initialValues = {
    title: '',
    type: 1,
    state: 1
  }
  useEffect(() => {
    // 获取详情数据
    const { id } = params
    if (id) {
      fetchArticleDetail(id).then((res) => {
        const { data } = res
        // 处理数据
        const keys = ['title', 'type', 'state', 'fileId', 'content']
        const info: any = {}
        keys.forEach((key) => {
          info[key] = data[key] ?? ''
          if (key === 'type') {
            setType(data[key] ?? 1)
          }
        })
        form.setFieldsValue(info)
      })
    }
  }, [params.id])

  // 当值发生改变隐藏菜单项
  const handleValuesChange = (modifyValue: any) => {
    const key = Object.keys(modifyValue)[0]
    if (key === 'type') {
      setType(modifyValue['type'])
    }
  }
  // handleFinish， 提交编辑
  function handleFinish(values: any) {
    editArticle(params.id as string, values).then(() => {
      useMessageApi()?.success('编辑成功！')
      backPage()
    })
  }
  // 返回上一页
  function backPage() {
    navigate('/main/note/list')
  }
  return (
    <EditWrapper>
      <div className="header">
        <div className="header-title">文章编辑</div>
      </div>
      <Card>
        <Form
          onValuesChange={handleValuesChange}
          form={form}
          initialValues={initialValues}
          name="note-edit-form"
          onFinish={handleFinish}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 10 }}
                label="文章标题"
                name="title"
                rules={[{ required: true, message: '请输入文章标题' }]}
              >
                <Input placeholder="请输入文章标题" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 10 }}
                label="菜单类型"
                name="type"
              >
                <Select
                  placeholder="请选择菜单类型"
                  options={[
                    { label: '文件类型', value: 1 },
                    { label: '菜单类型', value: 2 }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                valuePropName="checked"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 10 }}
                label="状态"
                name="state"
              >
                <Switch />
              </Form.Item>
            </Col>
            {type === 1 && (
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 10 }}
                  label="内容文件"
                  name="fileId"
                >
                  <UploadFile />
                </Form.Item>
              </Col>
            )}
            {type === 2 && (
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 24 }}
                  label="菜单内容"
                  name="content"
                >
                  <MDEditor height="700px" />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item>
                <Row justify="end">
                  <Button onClick={backPage}>取消</Button>
                  <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit">
                    提交
                  </Button>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </EditWrapper>
  )
}

export default memo(NoteEdit)
