let str = require('./a.js')
// import css from './index.css'
console.log(str)
let fn = () => {
    console.log('log日志')
}
@log
class A {
    constructor() {
        this.name = '黎在亚'
    }
}
function log(target) {
    console.log(target)
}
module.exports = {
    fn,
    A,
}
