let http = require('http')
let server = http.createServer();
let url = require('url');
let path = require('path')
let fs = require('fs');
let mime = require('mime') //第三方 获取请求的类型

class Server {
   async handleRequest(req,res){
       try{
        let {pathname} = url.parse(req.url,true)
        let currentPath = path.join(__dirname,pathname);
        let statObj = await fs.stat(currentPath) //判断路劲是否是文件夹
            if(statObj.isDirectory()){
                currentPath = path.join(currentPath,'index.html')
                await fs.access(currentPath)
                res.setHeader('Content-Type',mime.getType(currentPath),'charset=utf8')
                fs.createReadStream(currentPath).pipe(res);    
            }else{
                this.sendFile(req,res,currentPath)
            }
       }catch(e){
        this.errEmit(e,res)
       }
       
    }
    errEmit(e,res){
        res.sendCode = '404'
        res.end('notFound')
    }
    sendFile(req,res,currentPath){
        res.setHeader('Content-Type',mime.getType(currentPath),'charset=utf8')
        fs.createReadStream(currentPath).pipe(res);
    }
    
    start(...args){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

Server.start(3000,function(){
    console.log()
})

server.on('request',(req,res)=>{
    //console.log(req.url) // /http/index.html?111   /favicon.ico
   
    let objUrl = url.parse(req.url,true)
    let {pathname} = objUrl  // /http/index.html
    
    //console.log(path.resolve(__dirname,pathname)) // /client/index.html
    //console.log(path.join(__dirname,pathname)) ///Users/wuxichen/zf/js/http/client/index.html

    let currentPath = path.join(__dirname,pathname); //需要绝对路劲
    console.log(currentPath)
     fs.stat(currentPath,(err,statObj)=>{  //判断路劲是否是文件夹
        if(err){
            res.statusCode = '404'
            return res.end('notFound')
        }
     
        if(statObj.isDirectory()){
            currentPath = path.join(currentPath,'index.html')
            fs.access(currentPath,(err)=>{//判断路劲是否存在
                if(err){
                    res.sendCode = '404'
                    return res.end('notFound')
                }else{
                    // text/html  text/javascript 
                    res.setHeader('Content-Type',mime.getType(currentPath),'charset=utf8')
                    fs.createReadStream(currentPath).pipe(res);
                    //rs.pipe(ws)
                }
            }) 
        }else{
            res.setHeader('Content-Type',mime.getType(currentPath),'charset=utf8')
            fs.createReadStream(currentPath).pipe(res);
        }
    })
  
})


server.listen(3000)
server.on('error',function(err){
    console.log(err)
})

//http://localhost:3000/client/index.html?111

