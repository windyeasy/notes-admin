import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
import { ACCOUNT_TOKEN } from '@/pages/login/service/constants'
import { logOff } from '@/utils/log-off'
import { useMessageApi } from '@/utils/global-ant-proxy'
import NProgress from 'nprogress'
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      NProgress.start()
      /**
       * 在拦截里面添加token
       **/
      const token = localCache.getCache(ACCOUNT_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    // 响应拦截
    responseSuccessFn(res) {
      NProgress.done()
      if (res.data.code === -401) {
        // 退出登录
        logOff()
      }
      if (res.data.code != 0) {
        useMessageApi()?.error(res.data.message)
      }
      return res.data
    }
  }
})
export default request
