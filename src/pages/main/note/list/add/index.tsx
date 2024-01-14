import { WBaseForm, useWForm } from '@/base-ui/w-form'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { FormConfig } from './config/form.config'
import { Button, Card, Row } from 'antd'
import { AddWrapper } from './style'
import { newArticle } from '../service'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Add: FC<IProps> = () => {
  const { formProxyService } = useWForm()
  const navigate = useNavigate()
  useEffect(() => {
    formProxyService.execFieldsValueByData({})
  })
  function back() {
    navigate('/main/note/list')
  }
  function handleCancel() {
    back()
  }
  function handleSubmit() {
    formProxyService.form
      ?.validateFields()
      .then((values) => {
        values = formProxyService.execFns(values)
        newArticle(values).then(() => {
          useMessageApi()?.success('添加成功！')
          back()
        })
      })
      .catch((err) => {
        console.error('验证失败', err)
      })
  }
  return (
    <AddWrapper>
      <div className="header">
        <div className="header-title">文章添加</div>
      </div>
      <Card>
        <WBaseForm {...FormConfig} proxyService={formProxyService} />
        <Row justify="end">
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit} style={{ marginLeft: '10px' }} type="primary">
            确定
          </Button>
        </Row>
      </Card>
    </AddWrapper>
  )
}

export default memo(Add)
