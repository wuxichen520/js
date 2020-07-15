let fs = require('fs')
let path = require('path');
//读取默认是buffer
let r = fs.readFileSync(path.resolve(__dirname,"name.txt"),'utf8')
//console.log(r)//文件内容
fs.writeFileSync(path.resolve(__dirname,"name.txt"),'123')


let fs = require('fs')
let path = require('path');
function copy(){
    let buffer = Buffer.alloc(6);
    //r+如果文件不存在不会报错  w+以写为准没有这个文件会创建
    fs.open('./age.txt','r',(err,fd)=>{
        //fd 文件描述符 
        //buffer 读取到哪个内存中
        //0 buffer偏移量
        //1 读取的长度
        //0 从第几位读取
        fs.read(fd,buffer,0,2,1,function(err,byteRead,buffer){
            //byteRead 实际读取的长度
            console.log(byteRead,buffer.toString())
        })
      
    })
}
copy()


let fs = require('fs')
let path = require('path');
function copy(){
    let buffer = Buffer.from('您好');
   
    fs.open('./age.txt','r+',(err,fd)=>{
        //fd 写入文件描述符 
        //buffer 写入内容
        //3 buffer写入的长度
        //3 写入的长度
        //0 写入文件的位置


         //r+如果文件不存在不会报错  w+以写为准没有这个文件会创建
        fs.write(fd,buffer,0,3,1,function(err,wrriten){
            //byteRead 实际读取的长度
            console.log(wrriten)
        })
      
    })
}
copy()



let fs = require('fs')
let path = require('path');
function copy(source,target){
    let buffer = Buffer.alloc(3);
    let pos = 0;
    fs.open(source,'r',(err,fd)=>{
        fs.open(target,'w',(err,wfd)=>{
            function next (){
                fs.read(fd,buffer,0,3,pos,(err,byteRead)=>{
                    if(byteRead>0){
                        pos = pos+byteRead;
                        fs.write(wfd,buffer,0,byteRead,function(err,wrriten){
                            console.log('写入成功')
                            next ()
                        })
                    }else{
                        //读取完毕
                        fs.close(fd,()=>{

                        })
                        fs.close(wfd,()=>{
                            
                        })
                    }
                   
                })
            }
           
            next()
        })

         
       
      
    })
}
copy('./age.txt','./name.txt')



let fs = require('fs');
function mkdirSync(s){
    let arr = s.split('/');
   for(let i = 0;i<arr.length;i++){
        let currentPath = arr.slice(0,i+1).join("/")
        try{ //如果已经存在的目录就不用创建了
            fs.accessSync(currentPath)
        }catch(e){
            fs.mkdirSync(currentPath)
        }  
   }  
}

mkdirSync('a/b/c/d')


let fs = require('fs');
function mkdir(s,cb){
    let arr = s.split('/');
    function next(index){
        if(index >=arr.length) return cb()
        let currentPath = arr.slice(0,index+1).join("/")
        fs.access(currentPath,(err)=>{
            if(err){
                fs.mkdir(currentPath,()=>{
                    next(index+1)
                })
                
            }else{
                next(index)
            }
        })
    }
    next(0)
}

mkdir('a/b/c/d',function(){
    console.log('创建完成')
})


let fs = require('fs');
let path = require('path');
function removeDirSync(dir){
    let statObj = fs.statSync(dir) //文件的状态
    if(statObj.isDirectory()) {// 判断是目录还是文件
        let dirs = fs.readdirSync(dir)//拿到目录
        for(let i =0;i<dirs.length;i++){
           let current = path.join(dir,dirs[i]);
           removeDirSync(current)
           console.log(current)
        }
        fs.rmdirSync(dir)
    }else{
        //删除文件
        fs.unlinkSync(dir)
    }
 
}
removeDirSync('a')



let fs = require('fs');
let path = require('path');
function wideSync(dir){
    let arr = [dir];
    let index = 0;
    let current; //当前目录
  
    //console.log(current)
    while(current = arr[index++]){
     
        let statObj = fs.statSync(current) //文件的状态
        if(statObj.isDirectory()) {// 判断是目录还是文件
            let dirs = fs.readdirSync(current)//拿到目录  b
            dirs = dirs.map((d)=>path.join(current,d))  
            arr = [...arr,...dirs]  // [ 'a', 'a/b', 'a/b/c.js' ]
            console.log(arr)
        }else{
            //fs.unlinkSync(current)
        }
    }
    for(let i =arr.length-1;i>=0;i--){
        let current = arr[i];
        let statObj = fs.statSync(current)//拿到目录
        if(statObj.isDirectory()) {// 判断是目录还是文件
            fs.rmdirSync(current)
        }else{
            fs.unlinkSync(current)
        }
     }
   
}
wideSync('a')



let fs  = require('fs');
let path = require('path')
function rmdirSeries(dir,callback){
     fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()) {// 判断是目录还是文件
             fs.readdir(dir,(err,dirs)=>{
                
                dirs = dirs.map((d)=>path.join(dir,d))
                function next(index){
                    if(index == dirs.length) return fs.rmdir(dir,callback)
                    rmdirSeries(dirs[index],()=>next(index+1))
                }
                next(0)
             })//拿到目录
        }else{
            fs.unlink(dir,callback)
        }
        //console.log(statObj)
     }) //文件的状态
}
rmdirSeries('a',function(){
    console.log('删除成功')
})



let fs  = require('fs');
let path = require('path')
function rmdirDirParalle(dir,callback){
     fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()) {// 判断是目录还是文件
             fs.readdir(dir,(err,dirs)=>{
                if(dirs.length == 0){
                    return fs.rmdir(dir,callback)
                }
                dirs = dirs.map((d)=>{
                   let current =  path.join(dir,d)
                   rmdirDirParalle(current,done)
                   return current
                })
                //并发删除
                let index = 0
                function done(){
                    if(++index == dirs.length) {
                        fs.rmdir(dir,callback)
                    } 
                }
             })//拿到目录
        }else{
            fs.unlink(dir,callback)
        }
        //console.log(statObj)
     }) //文件的状态
}
rmdirDirParalle('a',function(){
    console.log('删除成功')
})

let fs = require('fs')
let readStream = fs.createReadStream('./name.txt',{
    flags:'r' ,//打开文件做什么  r w r+ w+ a...
    highWaterMark:2,//每次读取字节数 默认64k  文件内容
    start:0,
    end:3,
    //encoding:'utf8', // 默认buffer
    autoClose:true //默认true  读完是否关闭
});
readStream.on('open',function(){
    console.log('文件打开')
})
let arr = [] //拼接buffer 用数组  不要用字符串拼接 会出错
readStream.on('data',function(data){
    arr.push(data)
    console.log(data)
})
readStream.on('end',function(){
    console.log('读取完成',Buffer.concat(arr).toString())
})
readStream.on('close',function(){
    console.log('文件关闭')
})
readStream.on('error',function(){
    console.log('文件出错')
})

let fs = require('fs')
let ws = fs.createWriteStream('./name.txt',{ //写入的内容只能是字符串或buffer
    flags:'w',
    encoding:'utf8',
    highWaterMark:2,//预期使用的内存
});
let i = 9;
function write(){
    let flags = true
    while(i && flags){
        flags = ws.write(i--+'')
    }
}
ws.on('drain',()=>{ //当我们的预计大小和写入的大小相等或写入的内容大于了预计的内存会触发，当我们的写入内容的内容都写完会触发
    write()
    console.log('触发了')

})
write()

/* let i = 9;
while(i--){//耗9个内存
    ws.write(i+"")
} */


let fs = require('fs')
let rs = fs.createReadStream('./name.txt')
let ws = fs.createWriteStream('./name1.txt')
 rs.pipe(ws)


 let fs = require('fs')
 let rs = fs.createReadStream('./name.txt')
 let ws = fs.createWriteStream('./name1.txt')

 rs.on('data',function(data){
     let flags = ws.write(data)
     if(!flags){
        rs.pause()
     }
 })
 ws.on('drain',function(){
    rs.resume()
 }) 