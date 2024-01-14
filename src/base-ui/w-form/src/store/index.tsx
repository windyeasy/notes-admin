import { createSlice } from '@reduxjs/toolkit'
interface IWFormState {
  wFormData: any
}
const initialState: IWFormState = {
  wFormData: {}
}

const wFormSlice = createSlice({
  name: 'wForm',
  initialState,
  reducers: {
    changeFormDataAction(state, { payload }) {
      state.wFormData = payload
    }
  }
})
const wFormReducer = wFormSlice.reducer
export const { changeFormDataAction } = wFormSlice.actions
export default wFormReducer
