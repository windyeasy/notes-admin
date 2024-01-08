import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { accountLogin } from '../../service'
import useMessage from 'antd/es/message/useMessage'

import { LoginPanelWrapper } from './style'
import PanelAccount from '../panel-account'
import type { OnSubmitType } from '../panel-account'
import { useAppDispatch } from '@/store'
import { handleLoginAction } from '../../store'

interface IProps {
  children?: ReactNode
}

const LoginPanel: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const [messageApi, contextHolder] = useMessage()

  const handleSubmit: OnSubmitType = (values) => {
    accountLogin(values).then((res) => {
      if (res.code === 0) {
        // 存储token
        dispatch(handleLoginAction(res.data))
        // 获取用户信息
        messageApi.success('登录成功')
      } else {
        messageApi.error(res.message)
      }
    })
  }
  return (
    <LoginPanelWrapper>
      {contextHolder}
      <h2 className="panel-title">notes-admin</h2>
      <div className="panel-content">
        <PanelAccount onSubmit={handleSubmit} />
      </div>
    </LoginPanelWrapper>
  )
}

export default memo(LoginPanel)
