import {
  changeOpenKeysAction,
  changeSelectedKeysAction
} from '@/layout/components/layout-menu/store'
import { useAppDispatch, useAppSelector } from '@/store'
import { matchActiveMenuInfo } from '@/utils/map-menu'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'

/**
 * 当路由变化时设置展开和激活菜单
 */
export function useRouteChangeActiveMenu() {
  const location = useLocation()
  const { menuList } = useAppSelector(
    (state) => ({
      menuList: state.login.menuList
    }),
    shallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 通过路由匹配菜单设置，openKeys, 和selectedKeys
    if (menuList.length) {
      // console.log()
      const { openKeys, selectedKeys } = matchActiveMenuInfo(menuList, location.pathname)
      dispatch(changeOpenKeysAction(openKeys))
      dispatch(changeSelectedKeysAction(selectedKeys))
    }
  }, [location.pathname, menuList, dispatch])
}
