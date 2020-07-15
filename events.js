function EventEmitter(){
    this._event = {}
}
EventEmitter.prototype.on = function(eventName,callback){
    if(!this._event){
        this._event = {}
    }
    if(!this._event[eventName]){
        this._event[eventName] = [callback]
    }else{
     
        this._event[eventName].push(callback)
    }
    
}
EventEmitter.prototype.off = function(eventName,callback){
    if(this._event[eventName]){
        this._event  = this._event[eventName].forEach(item => {
            return item != callback
        });
    }
   
}
EventEmitter.prototype.emit = function(eventName,...args){
    if(this._event[eventName]){
        this._event[eventName].forEach(fn=>{
            fn.call(this,...args)
        })
    }
   
}

module.exports = EventEmitter
