import routes from '@/router'
import { useAppSelector } from '@/store'
import { checkArrayNotEmpty } from '@/utils/checkValue'
import { genRoutes } from '@/utils/map-menu'
import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'

export function useRoutingDynamic(pathname: string) {
  const [dynRoutes, setDynRoutes] = useState(routes)
  const { menuList } = useAppSelector(
    (state) => ({
      menuList: state.login.menuList
    }),
    shallowEqual
  )
  useEffect(() => {
    if (checkArrayNotEmpty(menuList)) {
      const newRoutes = genRoutes(menuList, pathname)
      setDynRoutes(newRoutes)
    }
  }, [menuList])

  return dynRoutes
}
