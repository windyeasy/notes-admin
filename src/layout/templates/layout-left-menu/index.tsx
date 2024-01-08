import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import { useAppSelector } from '@/store'
import { LayoutHeaderCrumb, LayoutMenu } from '@/layout'
import LogoInfo from '@/components/logo-info'
import { shallowEqual } from 'react-redux'
import ChangeThemeDrawer from '@/components/change-theme-drawer'
import Loading from '@/components/loading'
interface IProps {
  children?: ReactNode
}

const LayoutLeftMenu: FC<IProps> = () => {
  const { isCollapsed } = useAppSelector(
    (state) => ({
      isCollapsed: state.main.isCollapsed
    }),
    shallowEqual
  )
  return (
    <div>
      <Layout>
        <Sider width={220} collapsed={isCollapsed} collapsedWidth={60}>
          <LogoInfo />
          <LayoutMenu />
        </Sider>
        <Layout>
          <Header>
            <LayoutHeaderCrumb />
          </Header>
          <Content>
            <ChangeThemeDrawer />
            <div className="main-content">
              <Suspense fallback={<Loading fullscreen />}>
                <Outlet />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default memo(LayoutLeftMenu)
