let express = require('express')

let app = express(); //app函数监听  http.createServer(app)

//use 中间件    一般放在路由的上方  可以放公共的逻辑  执行的代码 用于鉴权 可以拦截 如果有权限就可以继续，决定的代码是否可以向下走
app.use("/",function(req,res,next){
    req.a = 111
    console.log(1)
    next()
})
//判断路劲  是不是一个文件 是文件就返回 否则不执行
app.use(express.static(__dirname))
//get  /post/delete/put  从上到下  请求方法+请求路劲

// app.get("/",function(req,res){
//     console.log(req.a)
//     res.end('hello')
// })
// app.get("/a/:id/:name",function(req,res){
//     console.log(req.params.id,req.params.name)
//     res.end('hello')
// })
// app.post("/",function(req,res){
//     res.end('post')
// })
// app.all("/",function(req,res){
//     res.end('all')
// })
// app.all("*",function(req,res){
//     res.end('all*')
// })
app.listen(3000,function(){
    console.log('start')
})

//  /a/:id/:name
//  /a/111/222
/* let server = '/a/:id/:name'
let client = '/a/111/222' //  '/a/([^\/]+)/([^\/]+)'
let arr = []
let regStr = server.replace(/:([^\/]+)/g,function(){
    arr.push(arguments[1])//id  name
    return '([^\/]+)'
})
let reg = new RegExp(regStr)
let [,...args] = client.match(reg) //[ '111', '222' ]
let params = arr.reduce((memo,current,index)=>(memo[current] = args[index],memo),{})

console.log(params) */