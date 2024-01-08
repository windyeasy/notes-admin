import { createSlice } from '@reduxjs/toolkit'
export type LayoutMode = 'leftSider' | 'topHeader'
export interface WThemeConfig {
  headerBg: string
  sidlerBg: string
  isDark: boolean
  colorPrimary: string
  layoutMode: LayoutMode
  isMenuDark: boolean
}
export interface CardColorType {
  tipTitle: string
  color: string
}
interface IThemeState {
  themeConfig: WThemeConfig
  primaryListColor: CardColorType[]
  headerColorList: CardColorType[]
}
const pulistCardList = [
  {
    tipTitle: 'LightSeaGreen(默认)',
    color: '#20B2AA'
  },
  {
    tipTitle: '科技蓝',
    color: 'rgb(22, 119, 255)'
  },
  {
    tipTitle: '拂晓',
    color: 'rgb(24, 144, 255)'
  },
  {
    tipTitle: '薄暮',
    color: 'rgb(245, 34, 45)'
  },
  {
    tipTitle: '火山',
    color: 'rgb(250, 84, 28)'
  },
  {
    tipTitle: '日暮',
    color: 'rgb(250, 173, 20)'
  },
  {
    tipTitle: '明青',
    color: 'rgb(19, 194, 194)'
  },
  {
    tipTitle: '极光绿',
    color: 'rgb(82, 196, 26)'
  },
  {
    tipTitle: '极客蓝',
    color: 'rgb(47, 84, 235)'
  },
  {
    tipTitle: '酱紫',
    color: 'rgb(114, 46, 209)'
  }
]
const initialState: IThemeState = {
  themeConfig: {
    colorPrimary: '#20B2AA',
    isDark: false,
    headerBg: '#20B2AA',
    sidlerBg: '#fff',
    layoutMode: 'leftSider',
    isMenuDark: true
  },
  // 主题样式列表
  primaryListColor: pulistCardList,
  headerColorList: [
    {
      tipTitle: '白色',
      color: '#fff'
    },
    ...pulistCardList
  ]
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeConfigAction(state, { payload }) {
      state.themeConfig = payload
    }
  }
})
const themeReducer = themeSlice.reducer
export const { changeThemeConfigAction } = themeSlice.actions
export default themeReducer
