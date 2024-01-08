import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { CrumbLeftWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { changeIsCollapsedAction } from '@/store/main'
import { localCache } from '@/utils/cache'
import { COLLAPSED } from '@/store/main/constants'
import { Breadcrumb } from 'antd'
import { useCrumbItems } from '@/hooks/useCrumbItems'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const CrumbLeft: FC<IProps> = () => {
  const { isCollapsed } = useAppSelector(
    (state) => ({
      isCollapsed: state.main.isCollapsed
    }),
    shallowEqual
  )
  const dispatch = useAppDispatch()
  function handleCollapsedClick() {
    const newIsCollapsed = !isCollapsed
    dispatch(changeIsCollapsedAction(newIsCollapsed))
    // 存储切换状态

    localCache.setCache(COLLAPSED, newIsCollapsed)
  }
  const crumbItems = useCrumbItems()
  return (
    <CrumbLeftWrapper>
      <div className="collapsed" onClick={handleCollapsedClick}>
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="breadcrumbs">
        <Breadcrumb
          itemRender={(route) => {
            if (route.href) {
              return <Link to={route.href}>{route.title}</Link>
            } else {
              return <>{route.title}</>
            }
          }}
          items={crumbItems}
        />
      </div>
    </CrumbLeftWrapper>
  )
}

export default memo(CrumbLeft)
