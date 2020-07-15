
let http = require('http');
let server = http.createServer();
let fs = require('fs');
let path = require('path');
let url = require('url')
server.on('request',(req,res)=>{
    let {pathname} = url.parse(req.url);
    let currentPath = path.join(__dirname,pathname);
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','PUT,GET,DELETE,POST,OPTIONS')
    if(req.method === 'OPTIONS'){
        return res.end()
    }
    if(pathname == '/user'){
        return res.end(JSON.stringify({name:'zs'}))
    }
    fs.stat(currentPath,(err,statObj)=>{
        if(statObj.isDirectory()){
            currentPath = path.join(currentPath,'index.html');
            fs.createReadStream(currentPath).pipe(res)
        }else{
            fs.createReadStream(currentPath).pipe(res)
        }
    })
})

server.listen(3000,function(){
    console.log('服务start')
})