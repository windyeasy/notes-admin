import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ACCOUNT_TOKEN, FLAT_MENU_LIST, MENU_LIST, USER_INFO } from '../service/constants'
import { getUserInfo } from '../service'
import { localCache } from '@/utils/cache'
import { fetchFlatMenuList } from '@/utils/map-menu'

// 存储登录信息
export const handleLoginAction = createAsyncThunk('handleLogin', (result: any, { dispatch }) => {
  // 存储token
  localCache.setCache(ACCOUNT_TOKEN, result.token)
  // 获取用户信息，并存入store

  getUserInfo().then(async (res) => {
    const { menuList } = res.data
    const userInfo = { ...res.data }
    Reflect.deleteProperty(userInfo, 'menuList')
    localCache.setCache(USER_INFO, userInfo)
    dispatch(changeUserInfoAction(userInfo))

    // 存储菜单列表
    localCache.setCache(MENU_LIST, menuList)
    // 存储扁平化菜单到，localStore里面，不用每一次重复处理节约性能
    const flatMenuList = fetchFlatMenuList(menuList)
    localCache.setCache(FLAT_MENU_LIST, flatMenuList)
    dispatch(changeMenuListAction(menuList))
    // 更改为登录状态
    dispatch(changeIsLoginAction(true))
  })
})

// 状态数据
interface ILoginState {
  userInfo: any
  isLogin: boolean
  menuList: any[]
}
const initialState: ILoginState = {
  userInfo: {},
  isLogin: false,
  menuList: []
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUserInfoAction(state, { payload }) {
      state.userInfo = payload
    },
    changeIsLoginAction(state, { payload }) {
      state.isLogin = payload
    },
    changeMenuListAction(state, { payload }) {
      state.menuList = payload
    }
  }
})

const loginReducer = loginSlice.reducer
export const { changeUserInfoAction, changeIsLoginAction, changeMenuListAction } =
  loginSlice.actions
export default loginReducer
