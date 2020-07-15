//深拷贝  浅拷贝

let school = {name:'wxc'}
let my = {age:{count:18}}
let all = {...school,...my};
school.name='zs'
my.age.count=20
console.log(all) // { name: 'wxc', age: { count: 20 } }

//===========
let school = {name:'wxc',fn:function () {},b:null,a:undefined}
let my = {age:{count:18}}
let all = JSON.parse(JSON.stringify({...school,...my})) ;
school.name='zs'
my.age.count=20
console.log(all) // { name: 'wxc', b: null, age: { count: 18 } }

//========

let obj = {name:'xxx',age:18}
let newObj = {a:1}
console.log(Object.assign(newObj,obj))//{ a: 1, name: 'xxx', age: 18 }

//判断类型 typeof instanceof Object.prototype.toString.call  constructor

function deepClone(obj) {
    if(obj == null){
        return obj
    }
    if(obj instanceof Date){ //日期
        return new Date(obj)
    }
    if(obj instanceof RegExp){ //日期
        return new RegExp(obj)
    }
    if(typeof obj !== 'object'){//不是对象
       return obj
    }
     //数组  对象
        // Object.prototype.toString.call(obj) === ['Object Array']?[]||{}
        let cloneObj = new obj.constructor
        for(let key in obj){
          if(obj.hasOwnProperty(key)){
            cloneObj[key]  = deepClone(obj[key])
          }
            
        }
        return  cloneObj
    
}
let obj ={name:'xxx',age:{count:18}}
let newObj = deepClone(obj);
obj.age.count = 20
console.log(newObj) // { name: 'xxx', age: { count: 18 } }

// =========

// 类型  string number boolean  undefined object symbol
let s = new Set([1,2,3,4,1,2,3])
s.add(5)
s.delete(5)
console.log(s.values()) //[Set Iterator] { 1, 2, 3, 4 }

console.log(typeof s )//object
console.log(s ) //Set { 1, 2, 3, 4 } 

let arr = [...s]
console.log(arr) //[ 1, 2, 3, 4 ] promise symbol.iterator

//===========
let s1 = new Set([1,2,3,4,5,1,2])
let s2 = new Set([5,4,5,3,2,1,3,4])

function union() {
    console.log([...new Set([...s1,...s2])])
}
union() //[ 1, 2, 3, 4, 5 ]


//===========
let s1 = new Set([1,2,3,1,2])
let s2 = new Set([5,4,5,3,2,1,3,4])

function union() {
    console.log([...new Set([...s1,...s2])])
}
union() //[ 1, 2, 3, 4, 5 ]
//=====
let s1 = new Set([1,2,3,1,2])
let s2 = new Set([5,4,5,3,2,1,3,4])
function insert(params) {
    return [...new Set(s1)].filter((item)=>{
        return s2.has(item)
    })
}
console.log(insert())//[ 1, 2, 3 ]

// =====
let s1 = new Set([1,2,3,1,2])
let s2 = new Set([5,4,5,4,1])
function diff() {
    return [...new Set(s1)].filter((item)=>{
        return !s2.has(item)
    })
    
}
console.log(diff())//[ 2, 3 ]

//========

let m = new Map()
m.set('1','2')
console.log(m)//Map { '1' => '2' }
let obj = {name:123}
m.set(obj,'3') //obj的引用被set引用
m.set(obj,'3') //obj的引用被set引用
obj = null //清空  这个空间还是在的
console.log(m)//Map { '1' => '2', { name: 123 } => '3' }
//===========
let m = new WeakMap() //WeakMap的key必须是对象
let obj = {name:123}
m.set(obj,{age:10}) 
m.set(obj,{age:12}) 
obj = null //清空  这个空间不在
console.log(m) 

//======
function deepClone(obj,hash = new WeakMap()) {
    if(obj == null){
        return obj
    }
    if(obj instanceof Date){ //日期
        return new Date(obj)
    }
    if(obj instanceof RegExp){ //日期
        return new RegExp(obj)
    }
    if(typeof obj !== 'object'){//不是对象
       return obj
    }
    if(hash.has(obj)){
        return hash.get(obj)
    }
     //数组  对象
        // Object.prototype.toString.call(obj) === ['Object Array']?[]||{}
        let cloneObj = new obj.constructor
        hash.set(obj,cloneObj)
        for(let key in obj){
          if(obj.hasOwnProperty(key)){
            cloneObj[key]  = deepClone(obj[key],hash)
          }
            
        }
        return  cloneObj
    
}
let obj ={name:'xxx',age:{count:18}}
obj.xxx = obj
let newObj = deepClone(obj);

console.log(newObj) //{name: 'xxx',age: { count: 18 },xxx: { name: 'xxx', age: { count: 18 }, xxx: [Circular] }}

//==============
//通过Object.defineProperty定义的属性可以增加拦截器

let obj = {}
let other = ''
Object.defineProperty(obj,'name',{
    //value:1,
    enumerable:true ,//false 不可枚举 不能遍历  函数的原型也是不可枚举的
    configurable:true ,//false 不可删除  delete obj.name
    //writable:true,//false 不可修改 obj.name = 123
    get(){  //  使用get  set  就不能有 value 跟 writable
        return other  //读取
    },
    set(val){ //设置
        other = val
    }
})
//delete obj.name
obj.name = 123
console.log(obj.name)

//==========


let obj={
    other:'123',
    set(val){
        console.log(1)
        this.other = val 
    },
    get(){
        return this.other
    }
}
obj.name = 456

console.log(obj.name)
 // 对象的setter  getter
 //====================
//vue 数据劫持 （所有额属性都改成get  set）

function update(params) {
    console.log('视图更新')
}
let data = {
    name:'123',
    loc:{jiangxi:'dongxiang'}
}

function observer(obj) {
    if(typeof obj !== 'object') return obj
    
    for(let key in obj){
        definedReactive(obj,key,obj[key])
    }
}
function definedReactive(obj,key,value) {
    observer(value)
    Object.defineProperty(obj,key,{
        get(){
            return value
        },
        set(val){
            if(val!=value){
                observer(val) //赋的值是对象
                update()
                value = val
            }
           
        }
    })
}
observer(data)
//data.loc.jiangxi='beijing'

/* data.loc= {
    jiangxi : 'beijing'
}
data.loc.jiangxi='123' */

data.loc = [1,2,3]
let methods = ['push','pop','reserve','sort','slice','shift','unshift']
methods.forEach((method)=>{
    let oldMethod = Array.prototype[method]
    Array.prototype[method] = function(){
        update()
       
        oldMethod.call(this,...arguments)
    }
})
data.loc.push(4)

// Vue.prototype.$set=function(obj,key,callback){
//     Object.defineProperty(obj,key,{
//         get:callback
//     })
// }

//==================this

let a = 1
let obj = {
    a:2,
    fn:function(){ //this =  obj
        setTimeout(function(){
            console.log(this)
        })
    }
}
obj.fn() //window

//======
let a = 1
let obj = {
    a:2,
    fn:function(){ //this =  obj
        setTimeout(()=>{
            console.log(this.a) //2
        })
    }
}
obj.fn() //window


//======
let a = 1
let obj = {
    a:2,
    fn:()=>{ //this =  obj
        setTimeout(()=>{
            console.log(this.a) //undefined
        })
    }
}
obj.fn() //window


// ======= proxy
function update(){
    console.log('更新视图')
}
let arr = [1,2,3];
let proxy = new Proxy(arr,{
    get(target,key){
        return target[key]
    },
    set(target,key,value){
        if(key === 'length') return true
        update()
        return Reflect.set(target,key,value) //数组的变化  内容变化  长度也变化
        //target[key] = value
        //console.log(arguments) //{ '0': [ 1, 2, 3 ], '1': '0', '2': 100, '3': [ 1, 2, 3 ] }
    }
});
proxy[0]=100
proxy.push(2)  //配合Reflect
console.log(proxy[0],proxy)

// ===========数组

let r = [1,2,3,4,5].reduce((a,b)=>{  //求和
    return a+b
})
let r = [{price:100,count:1},{price:200,count:2},{price:300,count:3}].reduce((a,b)=>{  //求和
    return a+b.price*b.count
},0) //指定第一项
console.log(r)

//==========

let keys = ['name','age']
let values = ['xxx',18]

let obj = keys.reduce((memo,current,index)=>{
   /*  memo[current] = values[index]
    return memo */
    return (memo[current] = values[index],memo)
},{})

console.log(obj)

//=======

function sum(a,b){
    return a+b
}
function toUpper(str){
    return str.toUpperCase()
}
function add(str){
    return '****'+str+'*****'
}
function compose(...fns){
    return function(...args){
        let lastFn = fns.pop() //sum
        //console.log(lastFn)
        return fns.reduceRight((a,b)=>{
            console.log(b)
            return b(a)
        },lastFn(...args))
    }
}

let r = compose(add,toUpper,sum)('a','b')
console.log(r)
console.log(add(toUpper(sum('a','b'))))//****AB*****

//======
[1,2,3].reduce((memo,current,index)=>{

},100)
//====
let r = [1,2,3].reduceRight((a,b)=>{
    return a+b
},3)
console.log(r)
//===============map
let arr = [1,2,3]

let newArr = arr.map((item)=>{
    return item*10
})
console.log(newArr)//[ 10, 20, 30 ]

//======
let arr = [1,2,3]

let newArr = arr.filter((item)=>{
    return item!=2
})
console.log(newArr)//[ 1, 3 ]

//======
let arr = [1,2,3]

let newArr = arr.some((item)=>{
    return item==5
})
console.log(newArr) //false 

//======
let arr = [1,2,3]

let newArr = arr.every((item)=>{
    return item!=5
})
console.log(newArr) //false 

//=======类

function Ani(name){
    //属性分为两种 实例上的属性  公有属性
    this.name = name
    this.arr = [1,2,3]
}
Ani.prototype.ad = {loc:'123'}
let a1 = new Ani('鸡')
let a2 = new Ani('猴子')


console.log(a1,a2,)//{ name: '鸡', arr: [ 1, 2, 3 ] } Ani { name: '猴子', arr: [ 1, 2, 3 ] }
console.log(a1.arr===a2.arr) // false
console.log(a1.ad===a2.ad)//true
//实例上有__proto__属性  指向所属类的原型   
console.log(a1.__proto__ === Ani.prototype)//true

// 所属类的原型有个属性 constructor 指向 类本身
console.log(Ani.prototype.constructor === Ani)//true
console.log(a1.constructor === Ani)//true
console.log(Ani.__proto__ === Function.prototype)//true

console.log(Function.prototype.__proto__ === Object.prototype)//true

console.log(a1.__proto__.__proto__ === Object.prototype) //true

//====
function Ani(name){
    //属性分为两种 实例上的属性  公有属性
    this.name = name
    this.eat = '吃'
}
Ani.prototype.ad = {loc:'123'}
function Tiger(name){
    this.name = name
    this.age = 18
    Ani.call(this) //继承实例上的属性
}
//继承公共属性
Tiger.prototype.__proto__ = Ani.prototype
//Tiger.prototype =Object.create(Ani.prototype)
Tiger.prototype.say = function(){
    console.log('说话')
}
//Tiger.prototype.__proto__ = Ani.prototype
let t1 = new Tiger()
t1.say()
console.log(t1.eat)
console.log(t1.constructor)
let a1 = new Ani('鸡')
let a2 = new Ani('猴子')

//============es6-calss
class Ani {
    static flag(){//es7支持静态属性  es6支持静态方法
        return 123
    }  
    constructor(name){
        this.name = name
        this.eat = '吃'
    }
    say(){
        console.log('吃')
       // console.log(this) ////undefined  es6 如果单独调用原型上的方法 this是不存在的
    }  
}

let a1 = new Ani('1')
let a2 = new Ani(2)
/* let say = a1.say es6 如果单独调用原型上的方法 this是不存在的
say()  */
console.log(Ani.flag()) //123
console.log(a1)
console.log(a2)
console.log(a1.say=== a2.say)//true

class Tiger extends Ani{
    constructor(name){ //Ani.call(this,'王老虎')
        super(name)
    }
}
let t1 = new Tiger('1')

t1.say()
console.log(t1.name)//1
console.log(a1.name)//1
console.log(Tiger.flag)//[Function: flag]  静态方法通过类调用的

//========
@flag
 class Ani {
    name='122';
    say(){
        console.log('说话')
    }
 }

 function flag(constructor) {
    constructor.type = '111'
 }

 console.log(Ani.type)
