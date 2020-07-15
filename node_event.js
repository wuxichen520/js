
let EventEmitter = require('events')
//console.log(EventEmitter)
/* {
    once: [Function: once],
    EventEmitter: [Circular],
    usingDomains: false,
    defaultMaxListeners: [Getter/Setter],
    init: [Function],
    listenerCount: [Function]
  } */

  let utils = require('util');
  function Girl(){

  }
 
  utils.inherits(Girl,EventEmitter)//继承
  let girl = new Girl();
  let cry = (thing)=>{
    console.log('cry'+thing) //cry被甩了
  }
  girl.on('newListener',(type)=>{
    console.log(type) //女主失恋
  })
  girl.on('女主失恋',cry) //addListener 订阅
  girl.off('女主失恋',cry) // 取消订阅
  girl.emit('女主失恋','被甩了')


  //js继承  __proto__    Object.create  Object.setPrototypeOf
