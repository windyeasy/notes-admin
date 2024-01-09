import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const AddEdit = lazy(() => import('@/pages/main/note/list/add-edit/index'))

/**
 * 如何设计权限功能，分析问题
 * 1. 需要通过按钮来控制是否添加到路由里面，
 *    应该是一个权限数组或字符串，
 *    所以在定义的时候需要特殊标识，
 * 2. 需要大改菜单功能，在路由对象在包装一个对象，作权限管理，后面作，先将功能实现
 */
const route: RouteObject = {
  path: '/main/note/list/add-edit',
  element: <AddEdit />
}

export default route
