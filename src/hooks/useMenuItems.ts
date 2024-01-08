import { useAppSelector } from '@/store'
import { handleMenuList } from '@/utils/handle-menu-list'
import { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'

export function useMenuItems() {
  const { menuList } = useAppSelector(
    (state) => ({
      menuList: state.login.menuList
    }),
    shallowEqual
  )
  const [menuItems, setItems] = useState<MenuProps['items']>([])
  const [rootMenuKeys, setRootMenuKeys] = useState<string[]>([])
  useEffect(() => {
    // 处理菜单列表
    if (menuList.length) {
      setItems(handleMenuList(menuList))
      const rootKeys = menuList.map((item) => String(item.id))
      setRootMenuKeys(rootKeys)
    }
  }, [menuList])

  return { menuItems, rootMenuKeys }
}
