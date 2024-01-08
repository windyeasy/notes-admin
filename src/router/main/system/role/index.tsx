import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Role = lazy(() => import('@/pages/main/system/role'))
const route: RouteObject = {
  path: '/main/system/role',
  element: <Role />
}

export default route
