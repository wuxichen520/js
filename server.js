let http = require('http');
let querystring = require('querystring')
let server = http.createServer();
server.on('request',(req,res)=>{ //req是一个可读流
    //console.log('request')
    //console.log(req.method) //请求方法
    //console.log(req.url) //请求url
    //console.log(req.httpVersion) //http版本
    //请求头

    let arr = []
    req.on('data',(chunk)=>{
        arr.push(chunk)
    })
    //curl -v --data 'name=111' http://localhost:3000
    req.on('end',()=>{
        let param = Buffer.concat(arr).toString();
        let obj = {}
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){//文本格式
            obj = querystring.parse(param)
        }
        if(req.headers['content-type'] === 'application/json'){//json格式
            obj.JSON.parse(param)
        }
        //xml  string
        console.log(req.headers)
        
       
        console.log(querystring.parse(param).age) //age = 18
        res.statusCode = 200;
        res.setHeader('a',1)
        res.end('welcome')
    })
});
let port = 3000
server.listen(port,()=>{
    console.log('server start'+port) //开启服务
})

server.on('error',(err)=>{
    if(err.erron == 'EADDRINUSE'){
        server.listen(++port)
    }
})

//nodemon 监控node变化 nodemon xxx.js  liveserve  supervis  