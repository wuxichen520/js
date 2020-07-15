let http = require('http')

let client = http.request({
    host:'localhost',
    method:'POST',
    path:'/',
    port:3000,
    headers:{
        a:1,
        //'Content-Type':'applycation/x-www-form-urlencoded'
        'Content-Type':'applycation/json'
    }
},(res)=>{
    let arr= [];
    res.on('data',(chunk)=>{
        arr.push(chunk)
    })
    res.on('end',()=>{
        //console.log(Buffer.concat(arr).toString())
    })
    //console.log(res)
})
client.end('name=xxx&&age=18') //可写流