import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Pagination, Row, Table } from 'antd'
import type { PaginationProps, TableProps } from 'antd'

import { ExtendPropType, RequestConfig, ResponseConfig, WColumType } from '../type'
import { propsListToColumns } from '../utils/utils'

import { extractProps } from '../utils/extract-props'
import { shallowEqual } from 'react-redux'

import { useAppSelector } from '@/store'
import { useWtbGetData } from '../hooks/useWtbGetData'

export interface WtbProps {
  children?: ReactNode
  type?: 'api' | 'data'
  api?: string
  requestConfig?: RequestConfig
  responseConfig?: ResponseConfig
  data?: any[]
  wcolumns: WColumType[]
  extendProps?: ExtendPropType[]

  tableConfig?: TableProps<any> // ant表格的额外配置信息
  paginationConfig?: PaginationProps // ant配置的额外信息
  pagination?: boolean // 是否显示分页
  pPosition?: 'left' | 'center' | 'right' // 分页器布局位置
}

/**
 *
 *  带数据请求的表格还有，分页功能，自定义内置组件
 */
const Wtb: FC<WtbProps> = (props) => {
  const {
    data,
    wcolumns,
    extendProps,
    type = 'api',
    pagination = true,
    tableConfig = {},
    paginationConfig = {},
    pPosition = 'center'
  } = props
  const columns = propsListToColumns(wcolumns, extendProps)
  const { list, total, isLoading, page } = useAppSelector(
    (state) => ({
      list: state.wtb.list,
      total: state.wtb.total,
      isLoading: state.wtb.isLoading,
      page: state.wtb.page
    }),
    shallowEqual
  )
  // 使用封装的use
  const { fetchPageList, changePageInfo, changeFetchPageListParams } = useWtbGetData()

  // 通过不同类型显示数据
  function fetchData() {
    if (type === 'api') {
      return list
    } else {
      return data
    }
  }
  // 处理分页器显示位置
  function handlePPosition(pPosition: string) {
    if (pPosition === 'left') {
      return 'start'
    }
    if (pPosition === 'right') {
      return 'end'
    }
    return 'center'
  }
  // 处理分页内容
  // 处理
  const handlePaginationChange: PaginationProps['onChange'] = (page, pageSize) => {
    // 改变page, 和pageSize
    changePageInfo(page, pageSize)
  }

  /**
   * 通过type类型来确定是自己发送请求还是，传递过来的数据
   */
  // 对columns数据信息处理
  useEffect(() => {
    if (type === 'api') {
      changeFetchPageListParams(extractProps(props))
      fetchPageList()
    }
  }, [type])
  return (
    <>
      <div className="content">
        <Table
          loading={isLoading}
          dataSource={fetchData()}
          columns={columns}
          rowKey={(record: any) => String(record.id)}
          pagination={false}
          {...tableConfig}
        />
      </div>
      {type === 'api' && pagination && (
        <Row
          justify={handlePPosition(pPosition)}
          className="pagination"
          style={{ marginTop: '15px' }}
        >
          <Pagination
            total={total}
            current={page}
            showSizeChanger
            showQuickJumper
            onChange={handlePaginationChange}
            {...paginationConfig}
          />
        </Row>
      )}
    </>
  )
}

export default memo(Wtb)
