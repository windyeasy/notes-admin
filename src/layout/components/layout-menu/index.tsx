import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MenuWrapper } from './style'
import { Menu } from 'antd'
import { useMenuItems } from '@/hooks/useMenuItems'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { changeOpenKeysAction } from './store'
import { useRouteChangeActiveMenu } from '@/hooks/useRouteChangeActiveMenu'

interface IProps {
  children?: ReactNode
}
const LayoutMenu: FC<IProps> = () => {
  const { menuItems, rootMenuKeys } = useMenuItems()
  const dispatch = useAppDispatch()
  useRouteChangeActiveMenu()
  /**
   * selectedKeys在切换路由时处理，
   * 当点击最底层菜单会切换路由，就能得到selectedKeys
   */
  const { openKeys, selectedKeys, themeConfig } = useAppSelector(
    (state) => ({
      openKeys: state.menu.openKeys,
      selectedKeys: state.menu.selectedKeys,
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )
  // 处理展开
  function handleOpenChange(keys: string[]) {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootMenuKeys.indexOf(latestOpenKey!) === -1) {
      dispatch(changeOpenKeysAction(keys))
    } else {
      const newKeys = latestOpenKey ? [latestOpenKey] : []
      dispatch(changeOpenKeysAction(newKeys))
    }
  }
  function fetchMenuTheme() {
    if (!themeConfig.isDark && themeConfig.isMenuDark) {
      return 'dark'
    } else {
      return 'light'
    }
  }
  return (
    <MenuWrapper>
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
        style={{ height: '100%' }}
        items={menuItems}
        theme={fetchMenuTheme()}
      />
    </MenuWrapper>
  )
}

export default memo(LayoutMenu)
