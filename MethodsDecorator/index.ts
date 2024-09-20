/*
* 1.方法装饰器参数说明
* target: 对于静态方法来说值是类，对于实例方法来说值是原型对象
* propertyKey: 方法的名称
* descriptor: 方法的描述对象，其中value属性是被装饰的方法
* */

interface PersonMethod {
    speak(str:string):void;
    isAdult(age:number):void
}
function Logger(target:object,propertyKey:string,descriptor:PropertyDescriptor) {
    // 缓存原始方法
    const origin = descriptor.value;
    // 替换原始方法
    descriptor.value = function(...args:any[]) {
        console.log(`${propertyKey}开始执行了....`)
        const result = origin.call(this,...args)
        console.log(`${propertyKey}执行结束!`)
        return result
    }
}

function Validate(maxValue:number) {
    return function(target:object,propertyKey:string,descriptor:PropertyDescriptor){
        //保存原始方法
        const original = descriptor.value
        //替换原始方法
        descriptor.value = function(...args:any[]) {
            //自定义的验证逻辑
            if(args[0] > maxValue) {
                throw new Error('年龄非法!')
            }
            // 如果所有参数都符合要求，则调用原始方法
            return original.apply(this,args);
        }
    }
}

class PersonMethods {
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
    @Logger speak(str:string) {
        console.log(`你好呀! 我的名字是${this.name},我的年龄是${this.age},${str}`)
    }
    @Validate(120) static isAdult(age:number) {
        return age >= 18
    }
}

const p5 = new PersonMethods('张三',20);
p5.speak('hello')
const message = PersonMethods.isAdult(1)
console.log(message)