import useToken from 'antd/es/theme/useToken'

export function useAntToken() {
  const [theme, token, hashId] = useToken()
  return {
    theme,
    token,
    hashId
  }
}
