import { Col, Row } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { WFormComPublicProps } from '../type'
import { handleConfig } from '../utils/utils'

interface IProps extends WFormComPublicProps {
  children?: ReactNode
}

const NormalForm: FC<IProps> = (props) => {
  const { formItems = [], colConfig = {}, formItemsInfo } = props

  return (
    <Row>
      {formItems?.map((item) => {
        return (
          <Col
            span={24}
            {...handleConfig(colConfig)}
            {...handleConfig(item.colConfig)}
            key={item.prop}
          >
            {formItemsInfo[item.type](item)}
          </Col>
        )
      })}
      {props.children && props.children}
    </Row>
  )
}

export default memo(NormalForm)
