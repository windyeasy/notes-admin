import { createSlice } from '@reduxjs/toolkit'
interface IMenuState {
  openKeys: string[]
  selectedKeys: string[]
}
const initialState: IMenuState = {
  openKeys: [],
  selectedKeys: []
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeOpenKeysAction(state, { payload }) {
      state.openKeys = payload
    },
    changeSelectedKeysAction(state, { payload }) {
      state.selectedKeys = payload
    }
  }
})
const menuReducer = menuSlice.reducer
export const { changeOpenKeysAction, changeSelectedKeysAction } = menuSlice.actions
export default menuReducer
