import request from '@/services'

// 添加信息
export function addPageData(pageName: string, payload: any) {
  return request.post({
    url: `/${pageName}`,
    data: payload
  })
}
// 编辑页面信息
export function editPageData(id: number, pageName: string, payload: any) {
  return request.patch({
    url: `/${pageName}/${id}`,
    data: payload
  })
}
// 删除页面数据
export function deletePageData(id: number, pageName: string) {
  return request.delete({
    url: `/${pageName}/${id}`
  })
}
