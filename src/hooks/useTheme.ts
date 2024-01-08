import { useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { ThemeConfig, theme as antTheme } from 'antd'
import { WThemeConfig, changeThemeConfigAction } from '@/store/theme'
import { localCache } from '@/utils/cache'
import { CACHE_THEME_CONFIG } from '@/store/theme/constants'

// 通过antd设置主题
export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfig>({})

  const { themeConfig } = useAppSelector(
    (state) => ({
      themeConfig: state.theme.themeConfig
    }),
    shallowEqual
  )
  // 修改主题公共方法
  const dispatch = useDispatch()
  function changeThemeConfig(themeConfig: WThemeConfig) {
    dispatch(changeThemeConfigAction(themeConfig))
    localCache.setCache(CACHE_THEME_CONFIG, themeConfig)
  }
  // 注入主题样式
  useEffect(() => {
    const { headerBg, sidlerBg, isDark, colorPrimary, isMenuDark } = themeConfig
    const newTheme: ThemeConfig = {
      algorithm: antTheme.defaultAlgorithm,
      token: {
        colorPrimary: colorPrimary,
        borderRadius: 6,
        paddingLG: 15,
        borderRadiusLG: 4
      },
      components: {
        Layout: {
          headerBg: headerBg,
          siderBg: isMenuDark ? '#001529' : sidlerBg
        }
      }
    }
    document.body.setAttribute('class', '')
    if (isDark) {
      newTheme.algorithm = antTheme.darkAlgorithm
      newTheme.components = {
        Layout: {
          headerBg: '#141414',
          siderBg: '#141414'
        }
      }
      document.body.setAttribute('class', 'dark')
    }
    setTheme(newTheme)
  }, [themeConfig])
  return { theme, changeThemeConfig }
}
