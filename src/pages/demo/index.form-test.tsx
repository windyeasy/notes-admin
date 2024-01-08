import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { DemoWrapper } from './style'
import { WBaseForm, formProxyService } from '@/base-ui/w-form'
import { groupsFormConfig } from './config'

interface IProps {
  children?: ReactNode
}
const infos = {
  id: 177047588,
  name: 'james',
  realname: '詹姆斯',
  cellphone: 13322223338,
  enable: 1,
  departmentId: 1,
  roleId: 1,
  createAt: '2023-12-12T06:31:57.000Z',
  updateAt: '2023-12-12T06:31:57.000Z'
}
const Demo: FC<IProps> = () => {
  useEffect(() => {
    formProxyService.execFieldsValueByData(infos)
  }, [])
  return (
    <DemoWrapper>
      <WBaseForm {...groupsFormConfig} proxyService={formProxyService} />
    </DemoWrapper>
  )
}

export default memo(Demo)
