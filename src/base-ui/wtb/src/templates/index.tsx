import React from 'react'
import type { ExtendPropType } from '../type'

import { utcFormat } from '@/utils/format'
import { Button, Flex, Popconfirm, Tag } from 'antd'
export type TbType = 'utcTimer' | 'button' | 'tag'
// import { Button } from 'antd'
export const extendProps: ExtendPropType[] = [
  {
    type: 'utcTimer',
    render: (time: string) => {
      return <>{utcFormat(time)}</>
    }
  },
  {
    type: 'button', // 定义按钮内容
    customConfigRender: (config) => {
      return (_, record: any) => {
        // 删除额外字段
        function showBtns(config: any, props: any, index: number) {
          if (config.popConfirmProps) {
            return (
              <Popconfirm
                onConfirm={() => {
                  config.click && config.click(record)
                }}
                okText="确定"
                cancelText="取消"
                {...config.popConfirmProps}
                key={index}
              >
                <Button {...props}>{config.text}</Button>
              </Popconfirm>
            )
          } else {
            return (
              <Button
                {...props}
                onClick={() => {
                  config.click && config.click(record)
                }}
                key={index}
              >
                {config.text}
              </Button>
            )
          }
        }
        return (
          <Flex wrap="wrap" gap="small">
            {config.buttons &&
              config.buttons.map((item, index: number) => {
                // 删除额外字段
                const props = { ...item }
                // 删除响应事件字段
                Reflect.deleteProperty(props, 'click')
                Reflect.deleteProperty(props, 'popConfirmProps')
                {
                  return showBtns(item, props, index)
                }
              })}
          </Flex>
        )
      }
    }
  },
  {
    type: 'tag',
    customConfigRender(config) {
      return (value: number | string) => {
        const tag = config?.tag
        if (tag) {
          const options = tag[value]
          return <Tag {...options}>{options?.text}</Tag>
        } else {
          return <></>
        }
      }
    }
  }
]
