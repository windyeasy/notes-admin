import { editUserPassword } from '@/services/main/system'
import { useAppSelector } from '@/store'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { logOff } from '@/utils/log-off'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode

  show?: boolean
  onClose?: () => void
}

const ModifyPasswordModal: FC<IProps> = (props) => {
  const { show, onClose } = props
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.login.userInfo
    }),
    shallowEqual
  )
  function handleCancel() {
    onClose && onClose()
  }
  // 提交密码编辑
  function submitEditPassoword(values: any) {
    if (values['surePassword'] !== values['password']) {
      useMessageApi()?.warning('输入密码与确定密码不一致')
      return
    }
    const { password } = values
    const { id } = userInfo
    const info = { password }
    editUserPassword(id, info).then(() => {
      useMessageApi()?.success('密码修改成功！')
      onClose && onClose()
      logOff()
    })
  }
  return (
    <Modal
      title={
        <div className="title" style={{ fontWeight: '400', fontSize: '18px' }}>
          密码编辑
        </div>
      }
      width="40%"
      open={show}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form name="edit-password" onFinish={submitEditPassoword}>
        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input placeholder="请输入密码" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              label="确认密码"
              name="surePassword"
              rules={[{ required: true, message: '请输入确定密码' }]}
            >
              <Input placeholder="请输入确定密码" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Row justify="end">
                <Button onClick={handleCancel}>取消</Button>
                <Button style={{ marginLeft: '10px' }} type="primary" htmlType="submit">
                  提交
                </Button>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(ModifyPasswordModal)
