import React from 'react'
import type { ReactNode } from 'react'
import {
  AppstoreOutlined,
  DesktopOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons'

interface MapIconsType {
  [index: string]: ReactNode
}
const mapIcons: MapIconsType = {
  SettingOutlined: <SettingOutlined />,
  DesktopOutlined: <DesktopOutlined />,
  MessageOutlined: <MessageOutlined />,
  AppstoreOutlined: <AppstoreOutlined />
}

export default mapIcons
