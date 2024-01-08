import { WFormProxyService } from '../service/proxy-service'

export function useWForm() {
  const formProxyService = new WFormProxyService()
  return {
    formProxyService
  }
}
