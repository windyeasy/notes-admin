import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { FoundWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
// import { Button } from 'antd'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = () => {
  const { themeConfig } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )
  return (
    <FoundWrapper>
      <div className="content">
        <div className="content-title" style={{ color: themeConfig.colorPrimary }}>
          404
        </div>
        <div className="content-subtitle">Not Found</div>

        <div className="content-des">
          We can&apos;t seem to find a page you&apos;re looking for.
        </div>
        <Link to="/" style={{ backgroundColor: themeConfig.colorPrimary }} className="return-home">
          BACK TO HOMEPAGE
        </Link>
      </div>
    </FoundWrapper>
  )
}

export default memo(NotFound)
