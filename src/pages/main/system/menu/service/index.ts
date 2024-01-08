import request from '@/services'

// 添加菜单
export function addMenu(payload: any) {
  return request.post({
    url: '/menu',
    data: payload
  })
}
// 编辑菜单
export function editMenu(id: number, payload: any) {
  return request.patch({
    url: '/menu/' + id,
    data: payload
  })
}
// 删除菜单
export function removeMenu(id: number) {
  return request.delete({
    url: '/menu/' + id
  })
}
