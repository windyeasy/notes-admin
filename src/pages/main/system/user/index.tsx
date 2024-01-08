import { WBaseTable, useWtbGetData } from '@/base-ui/wtb'
import { Button, Card, Row } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SearchForm } from '@/base-ui/w-form'
import { searchConfig } from './config/search.config'
import { UserWrapper } from './style'
import PageModal, { OnModalSubmitType } from '@/base-ui/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/base-ui/page-modal/hooks/usePageModal'
import { deleteUser, editUserInfo, newUser } from './service'
import { WBaseTableProps } from '@/base-ui/wtb/src'
import { useMessageApi } from '@/utils/global-ant-proxy'
import { usePermission } from '@/hooks/usePermission'
interface IProps {
  children?: ReactNode
}

const User: FC<IProps> = () => {
  const { setModalContent } = usePageModal()
  const { fetchPageList, changeSearchInfo } = useWtbGetData()
  const { isPermission } = usePermission()
  const tableConfig: WBaseTableProps = {
    api: '/user',
    tableConfig: {
      scroll: { x: 1600 }
    },
    wcolumns: [
      {
        title: '序号',
        dataIndex: 'id',
        render: (_, _2, index: number) => {
          return <>{index + 1}</>
        },
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '用户状态',
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
        title: '昵称',
        dataIndex: 'nickname'
      },
      {
        title: '电话',
        dataIndex: 'telephone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '备注',
        dataIndex: 'intro',
        width: 240
      },

      {
        type: 'utcTimer',
        title: '创建时间',
        dataIndex: 'createAt'
      },
      {
        type: 'utcTimer',
        title: '更新时间',
        dataIndex: 'updateAt'
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
              // 编辑用户
              setModalContent(false, record)
            },
            text: '编辑'
          },
          {
            type: 'primary',
            danger: true,
            popConfirmProps: {
              title: '删除用户',
              description: '是否确认删除当前用户?'
            },
            click: (record) => {
              deleteUser(record.id).then(() => {
                fetchPageList()
                useMessageApi()?.success('删除用户成功！')
              })
            },
            text: '删除'
          }
        ]
      }
    ]
  }
  // 添加用户
  function addUserClick() {
    setModalContent()
  }
  const newUserSubmit: OnModalSubmitType = (isNew, values, record) => {
    if (isNew) {
      newUser(values).then(() => {
        fetchPageList()
        useMessageApi()?.success('添加用户成功！')
      })
    } else {
      // 编辑用户
      editUserInfo(record.id, values).then(() => {
        fetchPageList()
        useMessageApi()?.success('编辑用户成功！')
      })
    }
  }
  const searchSubmit = (values: any) => {
    changeSearchInfo(values)
  }
  return (
    <UserWrapper>
      {isPermission(
        'sys:user:query',
        <Card>
          <SearchForm formname="userSearchForm" formItems={searchConfig} onSubmit={searchSubmit} />
        </Card>
      )}

      <Card>
        <Row justify="space-between" className="card-header">
          <div className="header-title">用户列表</div>
          <div className="header-btns">
            {isPermission(
              'sys:user:create',
              <Button type="primary" onClick={addUserClick}>
                新增用户
              </Button>
            )}
          </div>
        </Row>
        <WBaseTable {...tableConfig} />
      </Card>
      <PageModal modalConfig={modalConfig} onSubmit={newUserSubmit} formname="userForm" />
    </UserWrapper>
  )
}

export default memo(User)
