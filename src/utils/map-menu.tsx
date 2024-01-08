import React, { lazy } from 'react'
import { MenuItemRes } from '@/pages/login/service/type'
import { Navigate, type RouteObject } from 'react-router-dom'
import { checkArrayNotEmpty } from './checkValue'
import routes from '@/router'
import { localCache } from './cache'
import { FLAT_MENU_LIST } from '@/pages/login/service/constants'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
const DisplayIframe = lazy(() => import('@/layout/router-view/display-iframe'))
// 加载子路由
export function loadChildrenRoutes() {
  const req = require.context('@/router', true, /.+(\.ts|\.tsx)$/)
  const childrenRoutes: RouteObject[] = []
  req.keys().forEach((element: string) => {
    if (element !== './index.tsx') {
      childrenRoutes.push(req(element).default)
    }
  })
  return childrenRoutes
}
// 菜单匹配路由
/**
 *
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export function mapMenusToRoutes(menus: MenuItemRes[]) {
  const localRoutes = loadChildrenRoutes()
  return fetchMenusToRoutes(menus, localRoutes)
}

/**
 * 记录当登录成功后，去到main页面，然后的重定向导航页面信息
 */
export let firstMenu: MenuItemRes | null = null
// 得到菜单到路由数据
function fetchMenusToRoutes(
  menus: MenuItemRes[],
  localRoutes: RouteObject[],
  routes: RouteObject[] = []
) {
  for (const menu of menus) {
    // 查询路由是否存在
    let route: RouteObject | undefined = localRoutes.find((item) => menu.url === item.path)
    // 判断菜单，是否内嵌link
    if (menu.isIframe && !route && menu.url) {
      route = {
        path: menu.url,
        element: <DisplayIframe url={menu.link} key={menu.url} />
      }
    }
    // 找到匹配的路由就加入，路由列表
    if (route) {
      if (!firstMenu) firstMenu = menu
      routes.push(route)
    }
    // 判断是否有子路由，有就添加重定向地址
    if (checkArrayNotEmpty(menu.children) && menu.children) {
      // 判断是否添加从定向路由，是否菜单类型
      if (menu.redirectUrl && menu.menuType != 2) {
        const redirectUrl = menu.redirectUrl as string
        routes.push({ path: menu.url ?? '', element: <Navigate to={redirectUrl} /> })
      }
      // 递归调用得到路由
      fetchMenusToRoutes(menu.children, localRoutes, routes)
    }
  }
  return routes
}

// 生成带动态路由的正确路由
export function genRoutes(menuList: MenuItemRes[], path: string) {
  const newRoutes = [...routes]
  const routeIndex = newRoutes.findIndex((item) => item.path === path)
  if (routeIndex != -1) {
    const childrenRoutes = mapMenusToRoutes(menuList)
    const newRoute = { ...routes[routeIndex] }
    const children = newRoute.children ? [...newRoute.children] : []
    children.push(...childrenRoutes)
    newRoutes[routeIndex].children = children
  }
  return newRoutes
}

/**
 * 匹配菜单激活信息
 */
export function matchActiveMenuInfo(menuList: MenuItemRes[], path: string) {
  const openKeys: string[] = []
  const selectedKeys: string[] = []
  function _matchMenuInfo(menuList: MenuItemRes[], path: string) {
    for (const menu of menuList) {
      if (menu.url === path) {
        selectedKeys.push(String(menu.id))
        if (menu.parentId) {
          // 通过父id查询所有展开id
          const keys = getParentsMenuByParentId(menu.parentId).map((item) => item.id + '')
          openKeys.push(...keys)
        }

        return selectedKeys
      }
      if (checkArrayNotEmpty(menu.children) && menu.children) {
        _matchMenuInfo(menu.children, path)
      }
    }
  }
  _matchMenuInfo(menuList, path)
  return {
    openKeys,
    selectedKeys
  }
}

/*
 * 生成扁平化菜单, 使用扁平化菜单通过parentId查询所有的父级元素更容易
 * 如何接口直接通过接口获取
 */
export function fetchFlatMenuList(menuList: MenuItemRes[]) {
  const list: MenuItemRes[] = []
  for (const menu of menuList) {
    const menuInfo = { ...menu }
    Reflect.deleteProperty(menuInfo, 'children')
    list.push(menuInfo)
    if (checkArrayNotEmpty(menu.children) && menu.children) {
      list.push(...fetchFlatMenuList(menu.children))
    }
  }
  return list
}

/**
 * 通过parentId获取，所有父级元素
 */
export function getParentsMenuByParentId(parentId: string | number) {
  const parents: MenuItemRes[] = []
  /**
   * 扁平化处理后放在，localStore里面节省性能开销
   */
  const flatMenuList: MenuItemRes[] = localCache.getCache(FLAT_MENU_LIST)

  for (const menu of flatMenuList) {
    if (menu.id === parentId) {
      parents.push(menu)
      if (menu.parentId) {
        parents.push(...getParentsMenuByParentId(menu.parentId))
      }
    }
  }
  return parents
}

// 通过路由获取面包屑
export function fetchCrumbItemsByPath(menuList: MenuItemRes[], path: string) {
  const items: ItemType[] = []
  for (const menu of menuList) {
    if (menu.url === path) {
      // 添加前面的菜单
      let parents: ItemType[] = []
      if (menu.parentId) {
        parents = getParentsMenuByParentId(menu.parentId).map((item) => ({
          title: item.menuName,
          href: item.url
        })) as ItemType[]
        items.push(...parents)
      }
      items.push({
        title: menu.menuName,
        href: menu.url
      })
      return items
    } else if (checkArrayNotEmpty(menu.children) && menu.children) {
      items.push(...fetchCrumbItemsByPath(menu.children, path))
    }
  }
  return items
}
