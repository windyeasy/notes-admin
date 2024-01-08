import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import ColorCard from '../color-card'

import { CardColorType } from '@/store/theme'

interface IProps {
  children?: ReactNode
  colorList: CardColorType[]
  activeIndex?: number
  onChange?: (value: string) => void
}

const ColorCardList: FC<IProps> = (props) => {
  const { colorList, activeIndex = 0 } = props
  function handleTap(value: string) {
    props.onChange && props.onChange(value)
  }
  return (
    <div className="color-card-list">
      {colorList.map((item, index) => {
        return (
          <ColorCard
            bgColor={item.color}
            checked={activeIndex === index}
            tipTitle={item.tipTitle}
            onTap={handleTap}
            key={item.tipTitle}
          />
        )
      })}
    </div>
  )
}

export default memo(ColorCardList)
