import { MessageInstance } from 'antd/es/message/interface'

class GlobalAntProxy {
  message?: MessageInstance
  injectMessage(message: MessageInstance) {
    this.message = message
  }
}
const globalAntProxy = new GlobalAntProxy()

// 通过这个方法全局调用ant全局方法
export function useMessageApi() {
  return globalAntProxy.message
}
export { globalAntProxy }
