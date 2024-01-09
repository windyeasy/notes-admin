import request from '@/services'
// 添加文章
export function newArticle(payload: any) {
  return request.post({
    url: '/note',
    data: payload
  })
}
// 编辑文章
export function editArticle(id: number, payload: any) {
  return request.post({
    url: '/note/' + id,
    data: payload
  })
}
// 删除文章
export function removeArticle(id: number) {
  return request.delete({
    url: '/note/' + id
  })
}
