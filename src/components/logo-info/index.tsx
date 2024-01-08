import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginInfoWrapper } from './style'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const LogoInfo: FC<IProps> = () => {
  const { themeConfig, isCollapsed, logoInfo } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig,
      isCollapsed: state.main.isCollapsed,
      logoInfo: state.main.logoInfo
    }),
    shallowEqual
  )
  function showLoginTitle() {
    if (themeConfig.layoutMode === 'leftSider' && !isCollapsed) {
      return true
    } else if (themeConfig.layoutMode !== 'leftSider') {
      return true
    }
    return false
  }
  return (
    <LoginInfoWrapper>
      <Link to="/main" className="logo-content">
        <img className="login-img" src={logoInfo.logoSrc} alt="windyeasy-admin" />
        {showLoginTitle() && (
          <h1 className={classNames('logo-title', { 'white-logo-title': themeConfig.isMenuDark })}>
            {logoInfo.logoTitle}
          </h1>
        )}
      </Link>
    </LoginInfoWrapper>
  )
}

export default memo(LogoInfo)
