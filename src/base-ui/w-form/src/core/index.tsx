import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  ExtendFormItem,
  FollowFieldsChangeModifyValueType,
  VisibleIfInfoType,
  WFormItem,
  WFormPublicProps
} from '../type'
import { Form } from 'antd'
import {
  handleConfig,
  mapTypeIndexToRender,
  visibleIfDiff,
  visibleIfInfoDiffByKey
} from '../utils/utils'
import GroupsForm from '../components/GroupsForm'
import NormalForm from '../components/NormalForm'
import { fetchInitialValues } from '../utils/fetch-initial-values'

export interface WFromProps extends WFormPublicProps {
  children?: ReactNode
  extendFormItems: ExtendFormItem<any>[]
}
export interface FollowFieldsChangeModifyValueInfoType {
  [key: string]: FollowFieldsChangeModifyValueType[]
}
const WForm: FC<WFromProps> = (props) => {
  const { formItems = [], formname, extendFormItems, mode = 'normal', groups = [] } = props
  const [form] = Form.useForm()

  /**
   * 处理初始化值
   */
  const initialValues = fetchInitialValues(formItems)

  /**
   * 通过映射处理，扩展内容
   */
  const formItemsInfo = mapTypeIndexToRender(extendFormItems)
  /**
   * 实现 followFieldsChangeModifyValue功能
   *
   */
  const followFieldsChangeModifyValueInfo = useRef<FollowFieldsChangeModifyValueInfoType>({})
  /**
   * 实现visibleIf 功能
   */
  const visibleIfInfo = useRef<VisibleIfInfoType>({})
  const [formData, setFormData] = useState<any>({})
  const handleValuesChange = (modifyValue: any) => {
    // 判断是否修改值,获取key，实现followFieldsChangeModifyValue功能
    const key = Object.keys(modifyValue)[0]
    const keys = Object.keys(followFieldsChangeModifyValueInfo.current)
    if (keys && keys.length) {
      for (const modifyKey of keys) {
        const infos = followFieldsChangeModifyValueInfo.current[modifyKey]
        for (const info of infos) {
          if (
            info.followKey === key &&
            form.getFieldValue(info.followKey) === info.followKeyValue
          ) {
            form.setFieldValue(modifyKey, info.modifyValue)
          }
        }
      }
    }

    // 通过判断减少更新次数
    if (visibleIfInfoDiffByKey(modifyValue, visibleIfInfo.current)) {
      setFormData(form.getFieldsValue())
    }
  }
  // 对handleFormItems处理，实现visibleIf功能
  function handleFormItems() {
    const renderArray: WFormItem[] = []
    const length = formItems.length
    for (let i = 0; i < length; i++) {
      const item = formItems[i]
      // 添加额外处理函数
      if (item.handleParams && props.proxyService) {
        props.proxyService.addFn(item.handleParams)
      }

      if (item.visibleIf && Object.keys(item.visibleIf).length) {
        // 判断visibleIf是否存存储，添加比对，当已经存储就不再存储,减少更新次数
        if (!visibleIfInfo.current[item.prop]) {
          visibleIfInfo.current[item.prop] = item.visibleIf
        }
        const vifType = visibleIfDiff(item.visibleIf, formData)
        if (vifType === 'hidden') {
          continue
        } else if (vifType === 'disabled') {
          item.disabled = true
        } else if (item?.visibleIf?.disabled) {
          item.disabled = false
        }
      }
      // 存储修改值功能
      if (item.followFieldsChangeModifyValue && item.followFieldsChangeModifyValue.length) {
        // 判断是followFieldsChangeModifyValueInfo否存存储，添加比对，当已经存储就不再存储,减少更新次数
        if (!followFieldsChangeModifyValueInfo.current[item.prop]) {
          followFieldsChangeModifyValueInfo.current[item.prop] = item.followFieldsChangeModifyValue
        }
      }
      renderArray.push(item)
    }
    return renderArray
  }

  function setFieldsValueByData(data: any = {}) {
    if (Object.keys(data).length) {
      const length = formItems.length
      const initValues: any = {}
      for (let i = 0; i < length; i++) {
        const item = formItems[i]
        initValues[item.prop] = data[item.prop] ?? item.initValue ?? ''
      }

      form.setFieldsValue(initValues)
      setFormData(initValues)
    } else {
      setFormData(initialValues)
      form.resetFields()
    }
  }
  useEffect(() => {
    if (props.proxyService) {
      props.proxyService.injectForm(form)
      props.proxyService.injectSetFieldsValueByData(setFieldsValueByData)
    }
    return () => {
      // 卸载时清除注入方法
      props.proxyService && props.proxyService.clearInject()
    }
  })
  /**
   *
   * 使用items： 创建模板，实现搜索功能
   */
  return (
    <>
      <Form
        form={form}
        {...handleConfig(props?.uiConfig?.formConfig)}
        initialValues={initialValues}
        name={formname}
        onValuesChange={handleValuesChange}
      >
        {/*

          1. 对分组表单进行过滤处理，
          2. 过滤后在映射，多一个层
        */}
        {mode === 'normal' ? (
          <NormalForm
            formItems={handleFormItems()}
            formItemsInfo={formItemsInfo}
            colConfig={props.uiConfig?.colConfig}
          >
            {props.children && props.children}
          </NormalForm>
        ) : (
          <GroupsForm
            formItems={handleFormItems()}
            formItemsInfo={formItemsInfo}
            colConfig={props.uiConfig?.colConfig}
            groups={groups}
          />
        )}
      </Form>
    </>
  )
}

export default memo(WForm)
