import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { DisplayIframeWrapper } from './style'
import { Spin } from 'antd'

interface IProps {
  children?: ReactNode
  url?: string
}

const DisplayIframe: FC<IProps> = (props) => {
  const { url = '' } = props
  const [spinning, setSpinning] = useState(true)
  const iframeEl = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    try {
      iframeEl.current!.onload = () => {
        setSpinning(false)
      }
    } catch (error) {
      setSpinning(false)
      console.error('iframe加载出错', error)
    }
  }, [])
  return (
    <DisplayIframeWrapper>
      {spinning && (
        <div className="loading">
          <Spin spinning={spinning} />
        </div>
      )}

      <iframe className="iframe" ref={iframeEl} src={url} />
    </DisplayIframeWrapper>
  )
}

export default memo(DisplayIframe)
