import request from '@/services'

export function removeArticle(id: number) {
  return request.delete({
    url: '/note/' + id
  })
}
