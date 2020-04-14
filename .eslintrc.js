module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'babel-eslint', // 指定解析器，否则错误难消,不然使用es6装饰器 报错
    extends: 'eslint:recommended',
    // extends: 'airbnb-base', 上一行为不要代码格式化功能，这一行为代码格式化选择 airbnb 的格式规范。
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 'off',
        'no-var': 'error',
        // 这里可以设置规则：
        //"off" or 0 - 关闭规则
        //"warn" or 1 - 将规则作为警告打开（不影响退出代码）
        //"error" or 2 - 将规则作为错误打开（退出代码为1）
    },
}
