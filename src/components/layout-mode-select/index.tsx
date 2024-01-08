import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LayoutModeWrapper } from './style'
import { CheckOutlined } from '@ant-design/icons'
import { LayoutMode } from '@/store/theme'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { useTheme } from '@/hooks/useTheme'
import { Tooltip } from 'antd'

interface IProps {
  children?: ReactNode
}

const LayoutModeSelect: FC<IProps> = () => {
  const { changeThemeConfig } = useTheme()
  const { themeConfig } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )

  function showChecked(layoutMode: LayoutMode) {
    if (themeConfig.layoutMode === layoutMode) {
      return (
        <span className="checked">
          <CheckOutlined />
        </span>
      )
    }
    return ''
  }
  function changeLayoutMode(mode: LayoutMode) {
    const newThemeConfig = { ...themeConfig }
    newThemeConfig.layoutMode = mode
    changeThemeConfig(newThemeConfig)
  }
  return (
    <LayoutModeWrapper>
      <Tooltip title="左侧菜单栏布局">
        <div
          className="layout-mode-1 layout-mode-wrap"
          onClick={() => changeLayoutMode('leftSider')}
        >
          {showChecked('leftSider')}
          <div className="w-silder"></div>
          <div className="w-main">
            <div className="w-header"></div>
            <div className="w-content"></div>
          </div>
        </div>
      </Tooltip>
      <Tooltip title="混合菜单布局">
        <div
          className="layout-mode-2 layout-mode-wrap"
          onClick={() => changeLayoutMode('topHeader')}
        >
          {showChecked('topHeader')}
          <div className="w-header"></div>
          <div className="w-main">
            <div className="w-silder"></div>
            <div className="w-content"></div>
          </div>
        </div>
      </Tooltip>
    </LayoutModeWrapper>
  )
}

export default memo(LayoutModeSelect)
