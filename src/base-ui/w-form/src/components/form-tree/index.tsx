import { Tree } from 'antd'
import React, { memo } from 'react'
import type { FC, Key, ReactNode } from 'react'
import type { TreeProps } from 'antd/es/tree'
type TreeValue = string[] | number[]
export interface FormTreeProps extends TreeProps {
  children?: ReactNode
  value?: TreeValue
  onChange?: (value: { checked: Key[]; halfChecked: Key[] } | Key[]) => void
}

const FormTree: FC<FormTreeProps> = (props) => {
  const { value, onChange } = props
  const treeProps = { ...props }
  Reflect.deleteProperty(treeProps, 'value')
  Reflect.deleteProperty(treeProps, ' onChange')
  const handleCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    onChange && onChange({ checked: checkedKeys as Key[], halfChecked: info.halfCheckedKeys ?? [] })
    // onChange && onChange(checkedKeys)
  }
  return <Tree {...treeProps} onCheck={handleCheck} checkedKeys={value} />
}
export default memo(FormTree)
