const path = require('path')
module.exports = {
    mode: 'development', // 模式 默认两种production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'index.js', // 打包后的文件名
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
}
