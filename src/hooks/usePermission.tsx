import { useAppSelector } from '@/store'
import React, { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
export function usePermission() {
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.login.userInfo
    }),
    shallowEqual
  )
  const permissions = userInfo.permissions ?? []
  function isPermission(permission: string, rcNode: ReactNode) {
    if (permissions.includes(permission)) {
      return rcNode
    } else {
      return <></>
    }
  }

  return {
    permissions,
    isPermission
  }
}
