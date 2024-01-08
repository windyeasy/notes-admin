import { useAppSelector } from '@/store'
import { Button, Modal, Row } from 'antd'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { usePageModal } from './hooks/usePageModal'
import { PageModalConfig } from './type'
import { WBaseForm, useWForm } from '../w-form'
import { modalConfig } from '@/pages/demo/config'
import { ModalWrapper } from './style'
export type OnModalSubmitType = (isNew: boolean, values: any, record: any) => void
interface IProps {
  children?: ReactNode
  width?: string | number
  modalConfig: PageModalConfig
  formname: string
  onSubmit?: OnModalSubmitType
  onCancel?: () => void
}
/**
 * 生成展示数据，添加或者编辑，添加由上层添加，
 * 通过不同的模式确定是请求还是获取数据，通过store管理数据，可以通过hook改变数据
 * 数据请求交由上层处理得到后添加store, 通过store控制展开与关闭
 * 并进行展示
 */
const PageModal: FC<IProps> = (props) => {
  const { formProxyService } = useWForm()
  const {
    width = '769px',
    modalConfig: {
      uiConfig = {
        formConfig: { labelCol: { span: 6 }, wrapperCol: { span: 18 } },
        colConfig: { span: 12 }
      }
    }
  } = props

  // 数据与函数处理
  const { changeModalOpen } = usePageModal()
  const { isOpen, formData, isNew } = useAppSelector(
    (state) => ({
      isOpen: state.pageModal.isOpen,
      formData: state.pageModal.formData,
      isNew: state.pageModal.isNew
    }),
    shallowEqual
  )

  // 回调取消函数
  function handleCancel() {
    changeModalOpen(false)
    formProxyService.form?.resetFields()
    props.onCancel && props.onCancel()
  }
  // 回调提交函数
  function handleSubmit() {
    formProxyService.form
      ?.validateFields()
      .then((values) => {
        changeModalOpen(false)
        values = formProxyService.execFns(values)
        /*
         * 执行提交隐式处理功能，对函数参数进行处理
         */
        props.onSubmit && props.onSubmit(isNew, values, formData)
      })
      .catch((err) => {
        console.error('验证失败', err)
      })
  }

  // 处理过滤不同模式需要隐藏的表单项，editHidden或addHidden
  function handleHiddenFormItems() {
    let { formItems } = props.modalConfig

    const { editHidden, addHidden } = props.modalConfig
    // 是新增的时候过滤新增的
    if (addHidden && addHidden.length && isNew) {
      formItems = formItems.filter((item) => !addHidden!.includes(item.prop))
    }
    // 是编辑的时候就是过滤编辑隐藏
    if (editHidden && editHidden.length && !isNew) {
      formItems = formItems.filter((item) => !editHidden!.includes(item.prop))
    }
    return formItems
  }

  function fetchFooterPosition() {
    const { footerPosition = 'right' } = modalConfig
    if (footerPosition === 'left') {
      return 'start'
    }
    if (footerPosition === 'center') {
      return 'center'
    }
    if (footerPosition === 'right') {
      return 'end'
    }
  }
  // 副作用代码
  useEffect(() => {
    // 如果对象有值就，设置表单初始值
    formProxyService.execFieldsValueByData(formData)
  }, [isOpen])

  return (
    <Modal
      title={
        <div className="title" style={{ fontWeight: '400', fontSize: '18px' }}>
          {isNew ? props.modalConfig.header.newTitle : props.modalConfig.header.editTitle}
        </div>
      }
      width={width}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <ModalWrapper>
        <div className="modal-content">
          <WBaseForm
            proxyService={formProxyService}
            formname={props.formname}
            formItems={handleHiddenFormItems()}
            uiConfig={uiConfig}
          />
        </div>
        <Row justify={fetchFooterPosition()} className="modal-footer">
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit} style={{ marginLeft: '10px' }} type="primary">
            确定
          </Button>
        </Row>
      </ModalWrapper>
    </Modal>
  )
}

export default memo(PageModal)
