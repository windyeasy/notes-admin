import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const NodeList = lazy(() => import('@/pages/main/note/list'))
const route: RouteObject = {
  path: '/main/note/list',
  element: <NodeList />
}

export default route
