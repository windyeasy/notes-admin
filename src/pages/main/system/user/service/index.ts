import request from '@/services'
// 创建用户
export function newUser(payload: any) {
  return request.post({
    url: '/user',
    data: payload
  })
}
// 删除用户
export function deleteUser(id: number) {
  return request.delete({
    url: '/user/' + id
  })
}
// 编辑用户
export function editUserInfo(id: number, payload: any) {
  return request.patch({
    url: '/user/' + id,
    data: payload
  })
}
