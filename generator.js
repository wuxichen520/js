let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function(){
    let self = this;
    let index = 0;
    return {
        next(){
            return {
                value:self[index],
                done:index++ == self.length
            }
           
        }
       
    }
}}

function arg (){
    let arr = [...obj]
    console.log(arr)
}
arg()

// ==================
function* arg (){ //生成器配合yield使用
    yield 1 //产出
}

let a = arg();
console.log(a.next())
console.log(a.next())

//=======
let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function* (){
    let self = this;
    let index = 0
   while(index < self.length){
       yield self[index++]
   }
}}

function arg (){
    let arr = [...obj]
    console.log(arr)
}
arg()

function* read(){
    let a = yield 1
    console.log(a)
    let b = yield 2
    console.log(b)
    let c = yield 3
    console.log(c)
    let d= yield 4
    console.log(d)
}
let r = read()
console.log(r.next())  //第一次next不能传参数
console.log(r.next(2))
console.log(r.next())


//=======

let fs = require('mz/fs');
function* read(){
    let name = yield fs.readFile('./name.txt','utf8')
    let age = yield fs.readFile(name,'utf8')
    return age
}

let r = read();
 let {value,done} = r.next()
 value.then(data=>{
     let {value,done} = r.next(data)
     value.then(data=>{
        let {value,done} = r.next(data)
        console.log(value)
     })
 })


 let fs = require('mz/fs');
 let co = require('co')
function* read(){
    let name = yield fs.readFile('./name.txt','utf8')
    let age = yield fs.readFile(name,'utf8')
    return age
}
co(read()).then(data=>{
    console.log(data)
})

function co(it){
    return new Promise(function(resolve,reject){
        function next(val){
            let {value,done} = it();
            if(done){
                return resolve(value)
            }
            Promise.resolve(value).then(data=>{
                next(data)
            })
        }

        next()
    })
}




let fs = require('mz/fs');
let co = require('co')
async function read(){
   let name = await fs.readFile('./name.txt','utf8')
   let age = await fs.readFile(name,'utf8')
   return age
}
read().then(data=>{
   console.log(data)
})
 //=======
 