import menuReducer from '@/layout/components/layout-menu/store'
import loginReducer from '@/pages/login/store'
import mainReducer from '@/store/main'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import wtbReducer from '@/base-ui/wtb/src/store'
import pageModalReducer from '@/base-ui/page-modal/store'
import themeReducer from './theme'

const store = configureStore({
  reducer: {
    login: loginReducer,
    main: mainReducer,
    menu: menuReducer,
    wtb: wtbReducer,
    pageModal: pageModalReducer,
    theme: themeReducer
  }
})

type StoreStateFnType = typeof store.getState
export type IRootState = ReturnType<StoreStateFnType>

type DispatchType = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export interface AsyncThunkState {
  state: IRootState
}
export default store
