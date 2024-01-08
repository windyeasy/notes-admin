import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginWrapper } from './style'
import LoginPanel from './c-cpns/login-panel'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = () => {
  return (
    <LoginWrapper>
      <LoginPanel />
    </LoginWrapper>
  )
}

export default memo(Login)
