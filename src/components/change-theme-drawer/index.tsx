import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ThemeDrawerWrapper } from './style'
import { SettingOutlined } from '@ant-design/icons'
import { Alert, Button, Divider, Drawer, Switch } from 'antd'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { useAntToken } from '@/hooks/useAntToken'
import Cell from '../cell'
import ThemeColorList from '../theme-color-list'
import { useTheme } from '@/hooks/useTheme'
import LayoutModeSelect from '../layout-mode-select'
import { localCache } from '@/utils/cache'
import { CACHE_THEME_CONFIG } from '@/store/theme/constants'
import useMessage from 'antd/lib/message/useMessage'
import ChangeHeaderColor from '../change-header-color'
interface IProps {
  children?: ReactNode
}

const ChangeThemeDrawer: FC<IProps> = () => {
  const [open, setOpen] = useState(false)

  const [messageApi, contextHolder] = useMessage()
  const { token } = useAntToken()
  const { changeThemeConfig } = useTheme()
  const { themeConfig } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )
  function onClose() {
    setOpen(false)
  }
  function onOpen() {
    setOpen(true)
  }
  function changeMode() {
    const newThemeConfig = { ...themeConfig }
    newThemeConfig.isDark = !newThemeConfig.isDark
    changeThemeConfig(newThemeConfig)
  }
  // 处理复制配置内容
  function handleCopyThemeConfig() {
    const config = JSON.stringify(themeConfig)
    navigator.clipboard
      .writeText(config)
      .then(() => {
        messageApi.success('复制成功！')
      })
      .catch(() => {
        messageApi.success('复制失败！')
      })
  }
  // 重置布局
  function resetThemeConfig() {
    localCache.removeCache(CACHE_THEME_CONFIG)
    window.location.reload()
  }
  // 更改菜单主题
  function changeMenuDark() {
    const newThemeConfig = { ...themeConfig }
    newThemeConfig.isMenuDark = !newThemeConfig.isMenuDark
    changeThemeConfig(newThemeConfig)
  }

  return (
    <ThemeDrawerWrapper>
      {contextHolder}
      {/* 设置主题样式按钮 */}

      <div
        className="set-theme"
        style={{
          backgroundColor: token.colorPrimary
        }}
        onClick={onOpen}
      >
        <SettingOutlined />
      </div>

      <Drawer title="布局配置" placement="right" onClose={onClose} open={open}>
        <div className="wrap">
          <Divider>主题模式</Divider>
          <Cell
            title="深色模式"
            cellRight={<Switch onChange={changeMode} defaultChecked={themeConfig.isDark} />}
          />
        </div>
        <div className="wrap">
          <Divider orientation="left">主题色</Divider>
          <ThemeColorList />
        </div>
        <div className="wrap">
          <Divider orientation="left">布局</Divider>
          <LayoutModeSelect />
        </div>
        <div className="wrap">
          <Divider orientation="left">菜单主题</Divider>
          <Cell
            title="深色模式"
            cellRight={<Switch onChange={changeMenuDark} defaultChecked={themeConfig.isMenuDark} />}
          />
        </div>
        <div className="wrap">
          <Divider orientation="left">修改Header颜色</Divider>
          <ChangeHeaderColor />
        </div>

        <div className="wrap">
          <Divider />
          <div className="tip-content">
            <Alert
              message="点击下方按钮，复制布局配置去 `src/store/theme/index.ts` 中修改themeConfig字段"
              type="warning"
            />
          </div>
          <div
            className="btns"
            style={{
              marginTop: '20px'
            }}
          >
            <Button type="primary" onClick={handleCopyThemeConfig}>
              复制
            </Button>
            <Button style={{ marginLeft: '15px' }} onClick={resetThemeConfig}>
              重置
            </Button>
          </div>
        </div>
      </Drawer>
    </ThemeDrawerWrapper>
  )
}

export default memo(ChangeThemeDrawer)
