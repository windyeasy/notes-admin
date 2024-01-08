import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Card from 'antd/es/card/Card'

import { columns } from './config'
// import { useAppSelector } from '@/store'
// import { shallowEqual } from 'react-redux'
import CustomTable from '@/base-ui/wtb/src'
interface IProps {
  children?: ReactNode
}

const UserContent: FC<IProps> = () => {
  // const { userList } = useAppSelector(
  //   (state) => ({
  //     userList: state.user.userList
  //   }),
  //   shallowEqual
  // )

  return (
    <>
      <Card>
        <div className="content">
          <CustomTable api="/users/list" wcolumns={columns} />
        </div>
      </Card>
    </>
  )
}

export default memo(UserContent)
