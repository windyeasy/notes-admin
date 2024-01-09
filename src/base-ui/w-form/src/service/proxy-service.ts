import type { FormInstance } from 'antd'

type FnType = (data?: any) => void
export class WFormProxyService {
  form: FormInstance<any> | undefined
  // 处理字段函数数组
  handleParamsFns: any[] = []
  // 表单用于编辑的时候设置值
  setFieldsValueByData?: FnType
  // 判断状态是否已经兑现，
  setFieldsValueByDataState: 'pending' | 'fulfilled' = 'pending'
  // 设置值信息
  formData?: any
  injectForm(form: FormInstance<any>) {
    this.form = form
  }
  injectSetFieldsValueByData(fn: FnType) {
    this.setFieldsValueByData = fn
    this.setFieldsValueByDataState = 'fulfilled'
    if (this.formData) {
      this.setFieldsValueByData(this.formData)
      // 重置数据值
      this.formData = undefined
    }
  }
  /**
   * 通过这个方法可以为表单设置初始值，
   *  比如编辑是获取到数据后可以将值设置到表单上
   * @param info 表单信息值
   */
  execFieldsValueByData(info: any) {
    if (this.setFieldsValueByDataState === 'pending') {
      this.formData = info
    } else {
      if (this.setFieldsValueByData) this.setFieldsValueByData(info)
    }
  }
  // 当组件卸载时移除，原有属性
  clearInject() {
    this.setFieldsValueByDataState = 'pending'
    this.form = undefined
    this.setFieldsValueByData = undefined
  }
  addFn(fn: any) {
    if (this.handleParamsFns && this.handleParamsFns.length) {
      if (this.handleParamsFns.find((item) => item === fn)) {
        return
      }
    }
    this.handleParamsFns.push(fn)
  }

  execFns(values: any) {
    if (this.handleParamsFns && this.handleParamsFns.length) {
      for (const fn of this.handleParamsFns) {
        values = fn(values)
      }
    }
    return values
  }
}

export const formProxyService = new WFormProxyService()
