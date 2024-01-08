import Demo from '@/pages/demo'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/pages/login'))
const Main = lazy(() => import('@/pages/main'))
const NotFound = lazy(() => import('@/pages/not-found'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/main" />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes
