import request from '@/services'
import type { LoginAccount } from './type'

// 登录
export function accountLogin(account: LoginAccount) {
  return request.post({
    url: '/login',
    data: account
  })
}
// 获取用户信息
export function getUserInfo() {
  return request.get({
    url: '/user/info'
  })
}
