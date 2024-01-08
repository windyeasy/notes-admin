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
import { TopHeaderWrapper } from './style'
import ChangeThemeDrawer from '@/components/change-theme-drawer'
interface IProps {
  children?: ReactNode
}

const LayoutTopHeader: FC<IProps> = () => {
  const { isCollapsed } = useAppSelector(
    (state) => ({
      isCollapsed: state.main.isCollapsed
    }),
    shallowEqual
  )
  return (
    <TopHeaderWrapper>
      <Layout>
        <Header>
          <div className="header-left">
            <LogoInfo />
          </div>
          <LayoutHeaderCrumb />
        </Header>

        <Layout>
          <Sider width={220} collapsed={isCollapsed} collapsedWidth={60}>
            <LayoutMenu />
          </Sider>
          <Content>
            <ChangeThemeDrawer />
            <div className="main-content">
              <Suspense fallback="">
                <Outlet />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TopHeaderWrapper>
  )
}

export default memo(LayoutTopHeader)
