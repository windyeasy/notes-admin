import { SearchForm } from '@/base-ui/w-form'
import PageMainContent from '@/components/page-main-content'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { searchConfig } from './config/search.config'
import { WBaseTable, WBaseTableProps, useWtbGetData } from '@/base-ui/wtb'
import { removeArticle } from './service'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NoteList: FC<IProps> = () => {
  const { fetchPageList, changeSearchInfo } = useWtbGetData()
  const navigate = useNavigate()
  const tableConfig: WBaseTableProps = {
    api: '/note/list',
    tableConfig: {
      scroll: { x: 1300 }
    },
    wcolumns: [
      {
        title: '文章标题',
        dataIndex: 'title'
      },
      {
        title: '文章状态',
        dataIndex: 'state',
        width: 120,
        type: 'tag',
        align: 'center',
        tag: {
          1: { color: 'success', text: '启用' },
          0: { color: 'error', text: '禁用' }
        }
      },
      {
        title: '文章类型',
        dataIndex: 'type',
        width: 120,
        type: 'tag',
        align: 'center',
        tag: {
          1: { color: '#1177c1', text: '文件类型' },
          2: { color: '#808080', text: '文本类型' }
        }
      },
      {
        title: '文章地址',
        dataIndex: 'contentFileUrl',
        width: 400
      },
      {
        type: 'utcTimer',
        title: '创建时间',
        dataIndex: 'createAt',
        width: 160
      },
      {
        type: 'utcTimer',
        title: '更新时间',
        dataIndex: 'updateAt',
        width: 160
      },
      {
        title: '操作',
        type: 'button',
        align: 'center',
        width: 180,
        fixed: 'right',
        buttons: [
          {
            type: 'primary',
            click: (record) => {
              navigate(`/main/note/list/edit/${record.id}`)
            },
            text: '编辑'
          },
          {
            type: 'primary',
            danger: true,
            popConfirmProps: {
              title: '删除文章',
              description: '是否确认删除当前文章?'
            },
            click: (record) => {
              removeArticle(record.id).then(() => {
                fetchPageList()
                useMessageApi()?.success('删除文章成功！')
              })
            },
            text: '删除'
          }
        ]
      }
    ]
  }
  // 文章列表搜索功能
  const searchSubmit = (values: any) => {
    changeSearchInfo(values)
  }
  // 添加按钮点击
  const addClick = () => {
    // 跳转到添加页面
    navigate('/main/note/list/add')
  }
  return (
    <>
      <PageMainContent
        searchContent={
          <SearchForm formname="noteSearchForm" formItems={searchConfig} onSubmit={searchSubmit} />
        }
        tableContent={<WBaseTable {...tableConfig} />}
        headerInfo={{ title: '文章列表', btnTitle: '文章添加' }}
        onAddClick={addClick}
      />
    </>
  )
}

export default memo(NoteList)
