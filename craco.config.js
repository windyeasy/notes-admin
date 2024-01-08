const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  // webpack
  webpack: {
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
