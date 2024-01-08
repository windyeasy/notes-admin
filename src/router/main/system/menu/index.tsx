import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Menu = lazy(() => import('@/pages/main/system/menu'))
const route: RouteObject = {
  path: '/main/system/menu',
  element: <Menu />
}

export default route
