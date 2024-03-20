import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const DemoList = lazy(() => import('@/pages/main/demo/list'))
const route: RouteObject = {
  path: '/main/demo/list',
  element: <DemoList />
}

export default route
