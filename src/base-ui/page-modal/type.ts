import type { WBaseFormItem, WFormUiConfig } from '../w-form'

export interface PageModalConfig {
  header: {
    newTitle: string
    editTitle: string
  }
  editHidden?: string[]
  addHidden?: string[]
  uiConfig?: WFormUiConfig
  formItems: WBaseFormItem[]
  footerPosition?: 'left' | 'center' | 'right'
}
