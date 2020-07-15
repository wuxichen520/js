// console.dir(Object.keys(global),{showHidden:true})
// console.log(Object.keys(process))

import { setImmediate } from "timers"


console.log() //[ '--config', 'xxx.config.js', '--port', '3000' ]

let r = process.argv.slice(2)
let obj = r.reduce((memo,b,index,arr)=>{
    if(b.includes('--')){ // --port -- config
        memo[b.slice(2)] = arr[index+1]
    }
    return memo
},{})
console.log(obj) //{ config: 'xxx.config.js', port: '3000' }


console.log(process.env.NOOD_ENV)

console.log(process.cwd())

setTimeout(()=>{
    console.log('setTimeout')
})
setImmediate(()=>{
    console.log('setImmediate')
})
process.nextTick(()=>{
    console.log('nextTick')
})


setTimeout(()=>{
    process.nextTick(()=>{
        console.log('nextTick1')
    })
    console.log('setTimeout1')
})
process.nextTick(()=>{
    console.log('nextTick2')
    setTimeout(()=>{
        console.log('setTimeout2')
    })
})

let fs  = require('fs');

fs.readFile('./name.txt','utf8',function (err,data) {
    setTimeout(()=>{
        console.log('setTimeout')
    })
    setImmediate(()=>{
        console.log('setImmediate')
    })
})



let r = (function () {
    var a = 1
    return module.exports =a
   
})
console.log(r())//1

let r = require('./node1');
console.log(r(2,3))//5

let path = require('path');
console.log(path.basename('1.js','.js'))// 1
console.log(path.extname('1.js'))// .js  取扩展名
console.log(path.join('a','b'))//  a/b
console.log(__dirname) //目录名
console.log(__filename)// 目录名/文件名
console.log(path.join(__dirname,'b.js')) //绝对路径 目录+文件
console.log(path.resolve('b.js')) // === path.join(__dirname,'b.js')  
console.log(path.join('a','b.js')) // a/b.js
console.log(path.resolve('a','b.js')) //目录名/a/b.js  永远是绝对路径
console.log(path.dirname(__dirname))



let a = 'var a = 1;return x+y+z+a'
//最后一个是参数（字符串） 前面的参数是形参
let r = new Function('x','y','z',a)
console.log(r(1,2,3))//7

let vm = require('vm');  //沙箱  测试环境和外界安全隔离
let name = 'xxx'
vm.runInContext('console.log(name)') // throw Error