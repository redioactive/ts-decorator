
type Constructor = new (...args:any[])=> {};
interface Person {
    introduce:Function,
    getTime:Function
}
//装饰器
function CustomString<T extends Constructor>(target:T) {

    target.prototype.toString = function() {
        return JSON.stringify(this);
    }
    // 封闭原型对象，禁止随意操作其原型对象
    Object.seal(target.prototype)
}

//装饰器工厂
function LogInfo(n:number) {
    return function<T extends Constructor>(target:T) {
        target.prototype.introduce = function() {
            for(let i = 0; i<n;i++){
                console.log(`我的名字:${this.name},我的年龄:${this.age}`)
            }
        }
    }
}

//装饰器
//创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends Constructor>(target:T) {
    return class extends target {
        createdTime:Date;
        constructor(...args:any[]) {
            super(...args);
            this.createdTime = new Date();
        }
        getTime() {
            return `该对象的创建时间为:${this.createdTime}`
        }
    }
}

@CustomString
@LogInfo(4)
@LogTime
class Person {
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log('你好呀!')
    }
}

const p1 = new Person('张三',12);
console.log(p1)
p1.speak()
console.log(p1.toString())
p1.introduce()
console.log(p1.getTime())