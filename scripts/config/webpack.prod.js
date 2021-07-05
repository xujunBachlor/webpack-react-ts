const path = require('path')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { PROJECT_PATH } = require('../constant')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[fullhash:8].js',
    path: path.resolve(PROJECT_PATH, './dist')
  },
  plugins: [
    // 将css代码单独分离出来
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false
    }),
    // 将项目中没有使用到的css样式去除。nodir 即去除文件夹的路径，加快处理速度
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${path.resolve(PROJECT_PATH, './src/**/*.{tsx,scss,css}')}`, { nodir: true })
    }),
    // webpack打包分析
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888 // 端口号设置
    }),
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
