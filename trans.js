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