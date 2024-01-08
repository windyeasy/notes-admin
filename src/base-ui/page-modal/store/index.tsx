import { createSlice } from '@reduxjs/toolkit'
interface IPageMalState {
  isOpen: boolean
  isNew: boolean
  formData: any // 表单提交需要的数据
}
const initialState: IPageMalState = {
  isOpen: false,
  isNew: true,
  formData: {}
}

const pageModalSlice = createSlice({
  name: 'pageModal',
  initialState,
  reducers: {
    changeIsOpenAction(state, { payload }) {
      state.isOpen = payload
    },
    changeFormDataAction(state, { payload }) {
      state.formData = payload
    },
    changeIsNewAction(state, { payload }) {
      state.isNew = payload
    }
  }
})
const pageModalReducer = pageModalSlice.reducer
export const { changeIsOpenAction, changeFormDataAction, changeIsNewAction } =
  pageModalSlice.actions
export default pageModalReducer
