import Demo from '@/pages/demo'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/pages/login'))
const Main = lazy(() => import('@/pages/main'))
const NotFound = lazy(() => import('@/pages/not-found'))

const Add = lazy(() => import('@/pages/main/note/list/add/index'))
const NoteEdit = lazy(() => import('@/pages/main/note/list/edit/index'))
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
        path: '/main/note/list/add',
        element: <Add />
      },
      {
        path: '/main/note/list/edit/:id',
        element: <NoteEdit />
      },
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
