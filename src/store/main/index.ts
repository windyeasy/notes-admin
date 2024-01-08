import { createSlice } from '@reduxjs/toolkit'
const logo = require('@/assets/img/logo.png')
interface IMainState {
  isCollapsed: boolean
  logoInfo: {
    logoTitle: string
    logoSrc: any
  }
}

const initialState: IMainState = {
  isCollapsed: false,
  // logo信息
  logoInfo: {
    logoTitle: 'notes-admin',
    logoSrc: logo
  }
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeIsCollapsedAction(state, { payload }) {
      state.isCollapsed = payload
    }
  }
})
const mainReducer = mainSlice.reducer
export const { changeIsCollapsedAction } = mainSlice.actions
export default mainReducer
