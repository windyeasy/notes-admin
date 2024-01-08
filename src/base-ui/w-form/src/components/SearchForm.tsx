import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { WBaseFormProps } from '..'
import WBaseForm from '../index'
import { WFormProxyService } from '../service/proxy-service'
import { Button, Col, Row } from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
interface IProps extends WBaseFormProps {
  children?: ReactNode
  onSubmit?: (values: any) => void
  onReset?: () => void
}
const formProxyService = new WFormProxyService()
const SearchForm: FC<IProps> = (props) => {
  function onSubmit() {
    let values = formProxyService.form?.getFieldsValue()
    /*
     * 执行提交隐式处理功能
     *
     */
    values = formProxyService.execFns(values)
    props.onSubmit && props.onSubmit(values)
  }
  function onReset() {
    formProxyService.form?.resetFields()
    onSubmit()
  }
  return (
    <div>
      <WBaseForm
        proxyService={formProxyService}
        formname={props.formname}
        formItems={props.formItems}
        uiConfig={{
          formConfig: {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 }
          },
          colConfig: {
            span: 8
          }
        }}
      >
        {props.formItems.length < 3 && (
          <Col>
            <Button onClick={onSubmit} type="primary" icon={<SearchOutlined />}>
              查询
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={onReset} icon={<ReloadOutlined />}>
              重置
            </Button>
          </Col>
        )}
      </WBaseForm>
      {props.formItems.length > 2 && (
        <Row justify="end">
          <Col>
            <Button onClick={onSubmit} type="primary" icon={<SearchOutlined />}>
              查询
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={onReset} icon={<ReloadOutlined />}>
              重置
            </Button>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default memo(SearchForm)
