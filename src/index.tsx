import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/css/index.less'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from '@/App'
import store from './store'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'

dayjs.locale('zh-cn')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
/*
 * 如何通过theme: 生成新的theme, 要使用redux，所以我将主题放到，app里面使用
 *
 *
 */
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ThemeProvider>
)
