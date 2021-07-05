const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptmizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { PROJECT_PATH, isDev } = require('../constant')

module.exports = {
  entry: {
    main: path.resolve(PROJECT_PATH, './src/main.tsx')
  },
  module: {
    rules: [
      {
        test: /\.tsx?|js/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true // 将这些公共文件缓存起来，下次编译就会加快很多
        },
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        grid: true,
                        flexbox: 'no-2009'
                      },
                      stage: 3
                    }
                  ],
                  'postcss-normalize'
                ]
              },
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/imgs'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Base: path.resolve(PROJECT_PATH, './src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    // 对typescript类型在编译时进行强制检查
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json')
      }
    }),
    // 加快二次编译速度，第一次构建后以后每次的构建速度都会得到提升
    // 当前webpack版本不兼容
    // new HardSourceWebpackPlugin({}),
    // 显示项目启动和打包的进程
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: 'violet'
    }),
    // 每次打包时清空掉输出的目录
    new CleanWebpackPlugin()
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      !isDev &&
        // 压缩js代码
        new TerserWebpackPlugin({
          extractComments: false, // 设为 false 意味着去除所有注释，除了有特殊标记的注释
          terserOptions: {
            compress: { pure_funcs: ['console.log'] }
          }
        }),
      // 压缩css代码
      !isDev && new OptmizeCssAssetsWebpackPlugin()
    ].filter(Boolean),
    splitChunks: {
      chunks: 'all',
      name: false
    }
  }
}
