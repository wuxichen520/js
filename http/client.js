let http = require('http');
let client = http.request({
    host:'localhost',
    method:'POST',
    //path:'/',
    port:3000,
},(res)=>{
    let arr = [];
    res.on('data',(chunk)=>{
        arr.push(chunk)
    })
    res.on('end',()=>{
        console.log(Buffer.concat(arr).toString())
    })
})

client.end('name=xxx')