
let Promise  =  require('./promise.1')
let promise = new Promise(function(resolve,reject){
    console.log(1)
    // reject(1)
    resolve(1)
    // throw Error('失败')
}).then((data)=>{
    console.log(data)
},(data)=>{
    console.log('reject',data)
})
console.log(2)



//========
let Promise  =  require('./promise.1')
let promise = new Promise(function(resolve,reject){
   setTimeout(() => {
    resolve('成功')
   }, 1000);
})
promise.then((val)=>{
    console.log(val,'success1')
},(val)=>{
    console.log(val,'error')
})

promise.then((val)=>{
    console.log(val,'success2')
},(val)=>{
    console.log(val,'error')
})

//==================
let Promise  =  require('./promise.1')
let fs = require('fs')
function read (url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,'utf8',function(err,data){
            console.log(data,'1',url)
            resolve(data)
        })
    })
}
read('./name.txt').then((data)=>{
    console.log(data,'success')
}).then((val)=>{
    console.log(val,'success')
})

//===========
let Promise  =  require('./promise.1')
let p = new Promise(function(resolve,reject){
  
    resolve(123)
})

p.then((data)=>{
    console.log(data,'----')
    return data
}).then((data)=>{
    console.log(data,'222')
})

//=========
let Promise  =  require('./promise.1')
let p   = new Promise(function(resolve,reject){
    resolve()
})
let p2 = p.then(()=>{
    return p2
})
p2.then(null,function(data){
    console.log(data)
})