import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { DemoWrapper } from './style'
import screenfull from 'screenfull'
interface IProps {
  children?: ReactNode
}

const Demo: FC<IProps> = () => {
  function btnClick() {
    screenfull.toggle()
    // if (screenfull.isEnabled) {
    // }
  }
  return (
    <DemoWrapper>
      <button onClick={btnClick}>全屏</button>
    </DemoWrapper>
  )
}

export default memo(Demo)
