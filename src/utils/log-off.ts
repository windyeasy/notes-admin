import { MENU_LIST, USER_INFO } from '@/pages/login/service/constants'
import { localCache } from './cache'
import store from '@/store'
import { changeIsLoginAction } from '@/pages/login/store'

export function logOff() {
  localCache.removeCache(USER_INFO)
  localCache.removeCache(MENU_LIST)
  store.dispatch(changeIsLoginAction(false))
}
