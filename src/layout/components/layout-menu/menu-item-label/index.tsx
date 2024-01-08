import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ItemLabelWrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  url?: string | null
  title: string
  isLink?: boolean
  isIframe?: boolean
  link?: string
}

const MenuItemLabel: FC<IProps> = (props) => {
  const { url, isLink = false, isIframe = false, link = '' } = props
  const routePath = url ?? ''
  function showLink() {
    if (isLink && !isIframe) {
      return (
        <Link to={link} target="_blank">
          {props.title}
        </Link>
      )
    } else {
      return <Link to={routePath}>{props.title}</Link>
    }
  }
  return <ItemLabelWrapper>{showLink()}</ItemLabelWrapper>
}

export default memo(MenuItemLabel)
