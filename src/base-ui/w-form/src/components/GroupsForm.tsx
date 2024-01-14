import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { WFormComPublicProps, WGroupsType } from '../type'
import NormalForm from './NormalForm'

interface IProps extends WFormComPublicProps {
  children?: ReactNode
  groups: WGroupsType[]
}

const GroupsForm: FC<IProps> = (props) => {
  const { formItems, colConfig = {}, formItemsInfo, groups } = props
  function handleGroupsFormItems() {
    const renderArray: ReactNode[] = []
    // 查询出组后添加
    const length = groups.length
    for (let i = 0; i < length; i++) {
      const group = groups[i]
      const { renderWrapper, formItemsProps } = group
      const formItemsGroup = formItems.filter((item) => formItemsProps.includes(item.prop))
      const renderWrapperProps = {
        key: i,
        children: (
          <NormalForm
            formItems={formItemsGroup}
            formItemsInfo={formItemsInfo}
            colConfig={colConfig}
          />
        )
      }
      renderArray.push(renderWrapper(renderWrapperProps))
    }
    return renderArray
  }
  return (
    <>
      {handleGroupsFormItems().map((item) => {
        return item
      })}
    </>
  )
}

export default memo(GroupsForm)
