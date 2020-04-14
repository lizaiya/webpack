const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'production', // 模式 默认两种production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'index.[hash:8].js', // 打包后的文件名 加上8位数hash 防止缓存
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
    },
    // 打包在内存中,不会显示在文件夹
    devServer: {
        // 开发服务器配置
        port: 3000,
        progress: true,
        contentBase: './index.js', // 打包后的js
        compress: true,
        open: true, // 每次打开一个网页
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
    ],
    // 模块
    // loader 用于对模块的源代码进行转换
    module: {
        // 规则
        rules: [
            // style-loader 注入style标签将css添加到DOM中
            // css-loader 解析@import语法url()
            // less-loader 将less文件编译为css
            {
                test: /\.css$/, // 匹配css
                // 从右往左执行 从下往上执行
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.less$/, // 处理less文件
                // 从右往左执行
                use: [
                    {
                        loader: 'style-loader',
                    },
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
}
