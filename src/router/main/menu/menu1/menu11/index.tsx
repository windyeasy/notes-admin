import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Menu11 = lazy(() => import('@/pages/main/menu/menu1/menu11'))
const route: RouteObject = {
  path: '/main/menu/menu1/menu11',
  element: <Menu11 />
}

export default route
