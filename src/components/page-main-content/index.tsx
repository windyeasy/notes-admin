import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MainContentWrapper } from './style'
import { Button, Card, Row } from 'antd'

interface IProps {
  children?: ReactNode
  searchContent?: ReactNode
  headerInfo: {
    title: string
    btnTitle: string
  }
  onAddClick?: () => void
  tableContent?: ReactNode
}

const PageMainContent: FC<IProps> = (props) => {
  const { searchContent, headerInfo, onAddClick, tableContent } = props

  return (
    <MainContentWrapper>
      {searchContent && <Card>{searchContent}</Card>}
      <Card>
        <Row justify="space-between" className="card-header">
          <div className="header-title">{headerInfo?.title}</div>
          <div className="header-btns">
            {
              <Button type="primary" onClick={onAddClick}>
                {headerInfo?.btnTitle}
              </Button>
            }
          </div>
        </Row>
        {tableContent ?? tableContent}
      </Card>
    </MainContentWrapper>
  )
}

export default memo(PageMainContent)
