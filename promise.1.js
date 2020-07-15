function Promise(executor) {
    let self = this
    //给Promise 初始状态
    this.state = 'pendding'

    //成功和失败的原因
    this.value = undefined;
    this.eason = undefined;

    //定义两个队列  存放对应的then的回调
    self.onResolveCallback =[] //成功
    self.onRejectCallback = []//失败


    function resolve(val) {
       
        if(self.state  == 'pendding'){
            self.value = val
            self.state = 'fulfilled';
            self.onResolveCallback.forEach(fn =>fn());
           
        }
    
    }
    function reject(val) {
       
        if(self.state  == 'pendding'){
            self.value = val
            self.state = 'rejected';
            self.onRejectCallback.forEach(fn =fn());
        }
    
    }

    try{
        executor(resolve,reject)

    }catch(e){
        reject(e)
    }
    

}
let resolvePromise = function(promise2,x,resolve,reject){
    //判断x的值   1.普通值  2.promise 采用x的状态
    console.log(x === promise2)
    //x是promise
    if(x === promise2){
        return reject(new TypeError('循环'))
       
    }
    //x可能是promise
    if(x!=null && (typeof x === 'object' || typeof x === 'function')){
        return reject(new TypeError('循环'))
    }
    resolve(x)
}
Promise.prototype.then = function(onResolve,onReject){

    let promise2 = new Promise((resolve,reject)=>{  //返回新的promise 让当前的then执行后可以继续then
        if(this.state  == 'fulfilled'){
            setTimeout(()=>{
                try{
                    let x = onResolve(this.value)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
           
            })
            
        }
        if(this.state  == 'rejected'){
          
            setTimeout(()=>{
                try{
                    let x = onReject(this.value)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
               
            })
        }
        if(this.state  == 'pendding'){   //如果是异步 就要把成功跟失败存起来数组中  发布订阅
            this.onResolveCallback.push(()=>{
                
                setTimeout(()=>{
                    try{
                        let x = onResolve(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
            this.onRejectCallback.push(()=>{
               
                setTimeout(()=>{
                    try{
                        let x = onReject(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
        }
    })
    return promise2
    
}

module.exports = Promise
