import { useAppSelector } from '@/store'
import { fetchCrumbItemsByPath } from '@/utils/map-menu'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'

export function useCrumbItems() {
  const { menuList } = useAppSelector(
    (state) => ({
      menuList: state.login.menuList
    }),
    shallowEqual
  )
  const [items, setItems] = useState<ItemType[]>([])
  const location = useLocation()
  useEffect(() => {
    /**
     * 通过菜单匹配得到面包屑
     */
    if (menuList.length) {
      // 获取菜单列表
      const newItems = fetchCrumbItemsByPath(menuList, location.pathname)
      setItems(newItems)
    }
  }, [location.pathname, menuList])
  return items
}
