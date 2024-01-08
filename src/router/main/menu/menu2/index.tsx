import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Menu2 = lazy(() => import('@/pages/main/menu/menu2'))
const route: RouteObject = {
  path: '/main/menu/menu2',
  element: <Menu2 />
}

export default route
