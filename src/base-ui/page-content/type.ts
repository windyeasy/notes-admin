import { PageModalConfig } from '../page-modal/type'
import { WBaseFormItem } from '../w-form'
import { WBaseTableProps } from '../wtb'

export interface ContentConfig {
  searchConfig: WBaseFormItem[]
  pageName: string
  headerInfo: {
    title: string
    btnText: string
  }
  modalWidth?: number | string
  tableConfig: WBaseTableProps
  modalConfig: PageModalConfig
}
