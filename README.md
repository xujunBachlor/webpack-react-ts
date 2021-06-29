# 从零开始，使用手动 webpack 配置一个 react+typescript 的项目

# 项目初始化及配置

## 1、创建项目

在 github 上创建一个空的项目 webpack-react-ts，clone 下来后，使用`yarn init -y`初始化，生成`package.json`文件

### 2、安装 vscode 插件 gitignore

### 3、添加.npmrc

可以给 npm 设置镜像，这样别人在 clone 了项目于之后，即使 npm 没有设置镜像，也可以使用我们设置好的镜像下载依赖包
创建.npmrc 文件，写上内容`registry=https://registry.npm.taobao.org/`

# 规范代码与提交

使用许多工具来统一代码风格

## 1、EditorConfig

在 vscode 中安装扩展插件 `EditorConfig For vs Code`
安装完成后在左侧文件区点击右键可以选择`Generate .editorconfig`来生成一个默认的.editorconfig 文件，里面有默认配置

## 2、Prettier

`EditorConfig`是用来统一编辑器风格的，`Prettier`就是用来统一项目风格的。
`Prettier`拥有更多的配置项，且能在发布流程中执行命令自动格式化，能够有效的使项目代码风格趋于统一。
首先安装`Prettier`依赖包，`yarn add Prettier -D`
然后在根目录下创建`.prettierrc`文件，写上以下配置

```json
{
  "trailingComma": "all", // 对象的最后一个属性末尾也会添加 , ，比如 { a: 1, b: 2 } 会格式为 { a: 1, b: 2, }
  "tabWidth": 2, // 缩进大小
  "semi": false, // 分号是否添加
  "singleQuote": true, // 是否单引号
  "endOfLine": "lf", // 与 .editorconfig 保持一致设置
  "printWidth": 120, // 单行代码最长字符长度，超过之后会自动格式化换行
  "bracketSpacing": true, // 在对象中的括号之间打印空格， {a: 5} 格式化为 { a: 5 }
  "arrowParens": "always" // 箭头函数的参数无论有几个，都要括号包裹。比如 (a) => {} ，如果设为 avoid ，会自动格式化为 a => {}
}
```

然后我们安装 vscode 插件 `Prettier - Code formatter`

安装完成后再项目根目录创建`.vscode`目录，下面创建`settings.json`文件，该文件的配置会优先于 vscode 的 setting 配置

这样别人下载你的项目后就不会因为 vscode 的全局配置不同而导致项目代码规范不同了

在项目中有`.prettierrc`或`.editorconfig`文件时，`.vscode/settings.json`文件配置不会起作用，所以我们把配置全部写在`.vscode/settings.json`里面

并且把项目中的`.prettierrc`和`.editorconfig`文件删掉，这样就能使用统一的格式化配置文件了
