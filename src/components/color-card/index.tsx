import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ColorCardWrapper } from './style'
import { numAddPx } from '@/utils/num-add-px'
import { CheckOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

interface IProps {
  children?: ReactNode
  bgColor: string
  width?: number | string
  height?: number | string
  checked?: boolean
  tipTitle?: string
  onTap?: (color: string) => void
}

const ColorCard: FC<IProps> = (props) => {
  const { bgColor, width = '20px', height = '20px', checked = false, tipTitle = '' } = props
  function onclick() {
    props.onTap && props.onTap(bgColor)
  }
  return (
    <Tooltip placement="top" title={tipTitle}>
      <ColorCardWrapper
        style={{
          backgroundColor: bgColor,
          width: numAddPx(width),
          height: numAddPx(height)
        }}
        onClick={onclick}
      >
        {checked && (
          <span className="checked">
            <CheckOutlined />
          </span>
        )}
      </ColorCardWrapper>
    </Tooltip>
  )
}

export default memo(ColorCard)
