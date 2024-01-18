import request from '..'

interface UploadFileConfig {
  file: Blob
  name: string
  url: string
}

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

// 文件上传公共方法
export function uploadFileRequest<T = any>(config: UploadFileConfig) {
  const { name, file, url } = config
  const fromData = new FormData()
  fromData.append(name, file)
  return request.post<T>({
    url,
    data: fromData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 其它文件上传
export function uploadFile(file: UploadFileConfig['file']) {
  return uploadFileRequest({
    file,
    url: '/file/upload',
    name: 'file'
  })
}

export function editUserPassword(id: number, payload: { password: string }) {
  return request.patch({
    url: `/user/modify-password/${id}`,
    data: payload
  })
}
