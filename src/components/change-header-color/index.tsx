import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import ColorCardList from '../color-card-list'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { useTheme } from '@/hooks/useTheme'

interface IProps {
  children?: ReactNode
}

const ChangeHeaderColor: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { changeThemeConfig } = useTheme()
  const { themeConfig, headerColorList } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig,
      headerColorList: state.theme.headerColorList
    }),
    shallowEqual
  )

  function changeHeaderColor(value: string) {
    const newThemeConfig = { ...themeConfig }
    newThemeConfig.headerBg = value
    changeThemeConfig(newThemeConfig)
  }
  useEffect(() => {
    // 查询索引
    const index = headerColorList.findIndex((item) => item.color === themeConfig.headerBg)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [themeConfig])
  return (
    <div className="change-header-color">
      <ColorCardList
        colorList={headerColorList}
        onChange={changeHeaderColor}
        activeIndex={currentIndex}
      />
    </div>
  )
}

export default memo(ChangeHeaderColor)
