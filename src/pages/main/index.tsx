import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

// import ChangeThemeDrawer from '@/components/change-theme-drawer'
import { MainWrapper } from './style'
import { LayoutTopHeader } from '@/layout'
import { LayoutLeftMenu } from '@/layout'
import { useAntToken } from '@/hooks/useAntToken'
import { LayoutMode } from '@/store/theme'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const Main: FC<IProps> = () => {
  const { token } = useAntToken()
  const { themeConfig } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )
  function switchLayoutMode(mode: LayoutMode) {
    switch (mode) {
      case 'leftSider':
        return <LayoutLeftMenu />
      case 'topHeader':
        return <LayoutTopHeader />
      default:
        return ''
    }
  }
  function checkoutWhiteBg(color: string) {
    if (color === '#fff' || color === '#ffffff' || color === 'rgb(255, 255, 255)') {
      return false
    } else {
      return true
    }
  }

  return (
    <MainWrapper
      $borderColor={token.colorSplit}
      className={classNames({ otherHeaderTheme: checkoutWhiteBg(themeConfig.headerBg) })}
    >
      {/* <LayoutLeftMenu /> */}
      {switchLayoutMode(themeConfig.layoutMode)}
    </MainWrapper>
  )
}

export default memo(Main)
