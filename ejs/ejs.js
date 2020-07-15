let express = require('express')

let app = express(); //app函数监听  http.createServer(app)
app.engine('.html',require('ejs').__express); //指定渲染方式
app.set('view engine','.html'); //设置渲染方式
app.set('views','my') //设置文件夹的名字
app.get("/",function(req,res){
    res.render('index',{name:'xxx'})
})

app.listen(3000,function(){
    console.log('start')
})