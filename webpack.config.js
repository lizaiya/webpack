const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css,为单独文件
const OptimizeCss = require('optimize-css-assets-webpack-plugin') // 优化或者压缩CSS资源
const UglifyjsPlugin = require('uglifyjs-webpack-plugin') // 压缩js代码
// babel-loader 转换下载器
// @babel/core babel的核心代码 转换代码
// @babel/preset-env 将ES6转换ES5
//@babel/plugin-proposal-decorators es6装饰器
module.exports = {
    mode: 'development', // 模式 默认两种production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'index.[hash:8].js', // 打包后的文件名 加上8位数hash 防止缓存
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
    },
    // 打包在内存中,不会显示在文件夹
    devServer: {
        // 开发服务器配置
        port: 3000,
        progress: false,
        contentBase: './index.js', // 打包后的js
        compress: false,
        open: false, // 每次打开一个网页
    },
    // 优化项
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                cache: true, // 是否缓存
                parallel: true, // 是否并行压缩
                sourceMap: true,
            }),
            new OptimizeCss(),
        ],
    },
    // 数组 放着所有的webpack的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件
            filename: 'index.html', // 打包后的名称
            hash: true, // 将打包后的文件加上哈希值
            minify: {
                removeAttributeQuotes: true, // 去除属性双引号
                collapseWhitespace: true, // 打包后生成一行
            },
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    // 模块
    // loader 用于对模块的源代码进行转换
    module: {
        // 规则
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 用babel-loader 需要把ES6转换为ES5
                            presets: ['@babel/preset-env'],
                            plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]], //装饰器
                        },
                    },
                ],
            },
            // style-loader 注入style标签将css添加到DOM中
            // css-loader 解析@import语法url()
            // less-loader 将less文件编译为css
            {
                test: /\.(sa|sc|le|c)ss$/, // 处理sass scss less css
                // 从右往左执行 从下往上执行
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development', // 仅在dev模式下使用热更新
                            reloadAll: true, //如果hmr失效, 将强制更新
                        },
                    },
                    'css-loader',
                    'postcss-loader', // 加浏览器前缀
                    'less-loader',
                ],
            },
        ],
    },
}
