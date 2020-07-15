let buffer = Buffer.alloc(5) //安全
console.log(buffer)//<Buffer 00 00 00 00 00>

let buffer = Buffer.allocUnsafe(5)
console.log(buffer)//<Buffer ff ff ff ff 32>

let buffer = buffer.write('您',0,3,'utf8');

console.log(buffer) //<Buffer e4 bd a0 e5 a5 bd>
console.log(buffer.toString()) //你好  buffer和字符转转化

let buffer = Buffer.from([1, 2, 3]);
console.log(buffer) //<Buffer 01 02 03>




let buffer = Buffer.alloc(6) //安全
buffer.write('您',0,3,'utf8');

buffer.write('好',3,3,'utf8');

console.log(buffer.toString()) //您好

let buf5 = Buffer.from('您好小明');
let buf6 = Buffer.alloc(6);
buf5.copy(buf6,0,0,4);
buf5.copy(buf6,3,3,6);
console.log(buf6.toString())//您好


let buf1 = Buffer.from('您');
let buf2 = Buffer.from('好');
let buf3 = Buffer.concat([buf1,buf2],6); //6 字节长度
console.log(buf3.toString());//您好

console.log(Buffer.byteLength("你好")) //6
console.log(Buffer.from("你好").length)//6


let buffer = Buffer.from('您好')
let newBuf = buffer.slice(0,3);
console.log(newBuf.toString())//您