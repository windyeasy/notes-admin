import request from '@/services'
import type { AxiosRequestConfig } from 'axios'

export function getPageList(
  url: string,
  method: AxiosRequestConfig['method'],
  searchInfo: any = {}
) {
  if (method === 'GET') {
    return request.request({
      url,
      method,
      params: searchInfo
    })
  } else {
    return request.request({
      url,
      method,
      data: searchInfo
    })
  }
}
