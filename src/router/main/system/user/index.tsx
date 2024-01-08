import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const User = lazy(() => import('@/pages/main/system/user'))
const route: RouteObject = {
  path: '/main/system/user',
  element: <User />
}

export default route
