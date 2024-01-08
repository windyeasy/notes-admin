import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PageContentWrapper } from './style'
import PageModal, { OnModalSubmitType } from '../page-modal'
import { Button, Card, Row } from 'antd'
import { SearchForm } from '../w-form'
import { WBaseTable, useWtbGetData } from '../wtb'
import { usePageModal } from '../page-modal/hooks/usePageModal'
import { ContentConfig } from './type'
import { addPageData, deletePageData, editPageData } from './service'
import { useMessageApi } from '@/utils/global-ant-proxy'

interface IProps {
  children?: ReactNode
  contentConfig: ContentConfig
}

const PageContent: FC<IProps> = (props) => {
  const { searchConfig, headerInfo, tableConfig, modalConfig, pageName, modalWidth } =
    props.contentConfig
  const { setModalContent } = usePageModal()
  const { fetchPageList, changeSearchInfo } = useWtbGetData()
  // 添加用户
  function addUserClick() {
    setModalContent()
  }
  const newUserSubmit: OnModalSubmitType = async (isNew, values, record) => {
    if (isNew) {
      await addPageData(pageName, values)
      useMessageApi()?.success('添加成功！')
    } else {
      await editPageData(record.id, pageName, values)
      useMessageApi()?.success('编辑成功！')
    }
    fetchPageList()
  }
  function tableConfigAddButton() {
    const newTableConfig = { ...tableConfig }
    const columns = [...tableConfig.wcolumns]
    columns.push({
      title: '操作',
      type: 'button',
      // align: 'center',
      width: 140,
      fixed: 'right',

      buttons: [
        {
          size: 'small',
          type: 'primary',
          click: (record) => {
            // 编辑用户
            setModalContent(false, record)
          },
          text: '编辑'
        },
        {
          size: 'small',
          type: 'primary',
          danger: true,
          popConfirmProps: {
            title: '删除数据',
            description: '是否确认删除当前数据?'
          },
          click: async (record) => {
            await deletePageData(record.id, pageName)
            fetchPageList()
            useMessageApi()?.success('删除数据成功！')
          },
          text: '删除'
        }
      ]
    })
    newTableConfig.wcolumns = columns
    return newTableConfig
  }
  function onSearchSubmit(values: any) {
    changeSearchInfo(values)
  }
  return (
    <PageContentWrapper>
      <Card>
        <SearchForm formname="userSearchForm" onSubmit={onSearchSubmit} formItems={searchConfig} />
      </Card>
      <Card>
        <Row justify="space-between" className="card-header">
          <div className="header-title">{headerInfo.title}</div>
          <div className="header-btns">
            <Button type="primary" onClick={addUserClick}>
              {headerInfo.btnText}
            </Button>
          </div>
        </Row>
        <WBaseTable {...tableConfigAddButton()} />
      </Card>
      <PageModal
        width={modalWidth}
        modalConfig={modalConfig}
        onSubmit={newUserSubmit}
        formname="form"
      />
    </PageContentWrapper>
  )
}

export default memo(PageContent)
