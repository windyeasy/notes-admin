import request from '@/services'
// 添加文章
export function newArticle(payload: any) {
  return request.post({
    url: '/note',
    data: payload
  })
}
// 编辑文章
export function editArticle(id: number | string, payload: any) {
  return request.patch({
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

// 获取文章详情
export function fetchArticleDetail(id: number | string) {
  return request.get({
    url: '/note/detail/' + id
  })
}
