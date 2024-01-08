import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Department = lazy(() => import('@/pages/main/system/department'))
const route: RouteObject = {
  path: '/main/system/department',
  element: <Department />
}

export default route
