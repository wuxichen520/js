function say(who){
    console.log(who+'吃饭')
}

Function.prototype.before= function(cb){
    return (...arg)=>{
        cb()
        this(...arg)
    }
}

let newFn = say.before(function(){
    console.log('吃饭前')
})

newFn('我') //传参数  要做一些事情
//====================================

[1,2,3].push(4)   //我需要在push的时候触发更新

let oldPush= Array.prototype.push

function push(...args){
    //this [1,2,3]
    oldPush.call(this,...args)
    console.log('数据更新了')
}
let arr = [1,2,3]
push.call(arr,4,5,6)
console.log(arr)

//===============

function perform(anyMethod,wrappers){

    return function(){
        wrappers.forEach(wrapper => {
            wrapper.initialize()
        });
        anyMethod()
        wrappers.forEach(wrapper => {
            wrapper.close()
        });
    }
   
}

let newFn = perform (function(){
    console.log('say')
},[{ //wrapper1
    initialize(){
        console.log('wrapper1 initialize')
    },
    close(){
        console.log('wrapper1 close')
    },
    
},
{ //wrapper2
    initialize(){
        console.log('wrapper2 initialize')
    },
    close(){
        console.log('wrapper2 close')
    }
}
])
newFn()

//=============
function after(timers,method){
    // AO{   
    //     TIMER:3
    // }
    return function(){
        if( --timers == 0){
            method()
        }
    }
}

let fn = after(3,function(){
    console.log('really')
})

fn()
fn()
fn()

//============


let fs = require('fs');
let  after  = function(timers,cb){
    let scoll = {}
    return function(key,val){
        scoll[key] = val
        if(--timers == 0){
            cb(scoll)
        }
    }
}
let out = after(2,function(result){  //公用处理异步方法
    console.log(result)
})
//文件名  编码  callback
fs.readFile('./age.txt','utf8',function(err,data){
    out('age',data)
})
fs.readFile('./name.txt','utf8',function(err,data){
    out('name',data)
})



//======================
let fs = require('fs');
let event = {
    _arr:[],
    on(cb){
       this._arr.push(cb) 
    },
    emit(){
        this._arr.forEach(fn=>{
            fn();
        })
    }
}
let school = {}
event.on(function(){
    console.log('一个')
})
event.on(function(){
    if(Object.keys(school).length == 2){
        console.log(school)
    }
})



fs.readFile('./age.txt','utf8',function(err,data){
    school.age = data
    event.emit()
})
fs.readFile('./name.txt','utf8',function(err,data){
    school.name = data
    event.emit()
})


//=========
//被观察者
class Subject{
    constructor(){
        this.state='开心',
        this._arr=[]
    }
    attach(observer){
        this._arr.push(observer)
    }
    setState(newState){
        this.state = newState;
        this._arr.forEach(observer=>{
            observer.update(newState)
        })
    }
}

//观察者
class Observer{
    constructor(name){
        this.name = name
    }
    update(newState){
        console.log(this.name + newState)
    }
}

let s = new Subject();
let o1 = new Observer('我')
let o2 = new Observer('他')
s.attach(o1)
s.attach(o2)

s.setState('不开心')
s.setState('好开心')