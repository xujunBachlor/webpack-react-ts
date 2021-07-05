const path = require('path')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { PROJECT_PATH } = require('../constant')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[fullhash:8].js',
    path: path.resolve(PROJECT_PATH, './dist')
  },
  plugins: [
    // 打包时将文件拷贝到目标目录
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(PROJECT_PATH, './public'),
          from: '*.ico',
          to: path.resolve(PROJECT_PATH, './dist'),
          toType: 'dir'
        }
      ]
    })
  ]
})
