import request from '..'

// 获取全部角色
export function getEntireRoles() {
  return request.get({
    url: '/role/all'
  })
}

// 获取全部部门
export function getEntireDepartments() {
  return request.get({
    url: '/department/all'
  })
}
// 获取菜单列表
export function getEntireMenuList() {
  return request.get({
    url: '/menu'
  })
}
