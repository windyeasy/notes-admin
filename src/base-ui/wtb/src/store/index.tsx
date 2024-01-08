import { AsyncThunkState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FetchPageListParamsType } from '../hooks/useWtbGetData'
import { getPageList } from '../service'
import { fetchListAndTotal } from '../utils/utils'
interface IWtbState {
  list: any[]
  total: number
  // 分页处理
  page: number
  size: number
  fetchPageListParams: FetchPageListParamsType | Record<string, never>
  // 搜索内容处理
  searchInfo: any
  // 管理loading效果
  isLoading: boolean
}
const initialState: IWtbState = {
  list: [],
  total: 0,
  page: 1,
  size: 10,
  fetchPageListParams: {},
  searchInfo: {},
  isLoading: false
}

const wtbSlice = createSlice({
  name: 'wtb',
  initialState,
  reducers: {
    changeListAction(state, { payload }) {
      state.list = payload
    },
    changeTotalAction(state, { payload }) {
      state.total = payload
    },
    changePageAction(state, { payload }) {
      state.page = payload
    },
    changeSizeAction(state, { payload }) {
      state.size = payload
    },
    changeParamsAction(state, { payload }) {
      state.fetchPageListParams = payload
    },
    changeSearchInfoAction(state, { payload }) {
      state.searchInfo = payload
    },
    changeIsLoadingAction(state, { payload }) {
      state.isLoading = payload
    }
  }
})

// 获取列表户籍action
export const fetchPageListAction = createAsyncThunk<void, void, AsyncThunkState>(
  'fetchPageList',
  (_, { getState, dispatch }) => {
    // 获取分页查询信息
    const wtb = getState().wtb
    const { api, method, dataIndexList, totalIndexList, pagination } = wtb.fetchPageListParams
    let info: any = {}
    if (pagination) {
      info = { page: wtb.page, pageSize: wtb.size }
    }
    // const offset = (wtb.page - 1) * wtb.size
    // const info = { offset, size: wtb.size }

    const searchInfo = wtb.searchInfo
    const queryInfo = { ...info, ...searchInfo }
    dispatch(changeIsLoadingAction(true))

    // 请求数据，通过分页
    getPageList(api, method, queryInfo)
      .then((res) => {
        dispatch(changeIsLoadingAction(false))
        const { total, list } = fetchListAndTotal(res, dataIndexList, totalIndexList)
        dispatch(changeTotalAction(total))
        dispatch(changeListAction(list))
      })
      .catch((err) => {
        console.log('wtb-列表请求出错', err)
        dispatch(changeIsLoadingAction(false))
      })
  }
)
const wtbReducer = wtbSlice.reducer
export const {
  changeListAction,
  changeTotalAction,
  changePageAction,
  changeSizeAction,
  changeParamsAction,
  changeSearchInfoAction,
  changeIsLoadingAction
} = wtbSlice.actions
export default wtbReducer
