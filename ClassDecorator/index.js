"use strict";
/*
1. 基本语法
* Demo函数会在Person类定义时执行
* 参数说明:
* target参数是被装饰的类，即:Person
*

function Demo(target:Function) {
    console.log(target)
}
@Demo
class Person {
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}
*/
//------------------------------------------------------------------------------------------------------------
/*
* 2. 应用举例
* function CustomToString(Target:Function) {
    Target.prototype.toString = function() {
        return JSON.stringify(this);
    }
    Object.seal(Target.prototype)
}
@CustomToString
class Person {
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}

const p1 = new Person('张三',20);
console.log(p1.toString())

interface Person {
    x:number
}

Person.prototype.x = 99;
console.log(p1.x)

* */
//---------------------------------------------------------------------------------------------------
/*
// 3. 定义构造类型
!! type Constructor = new(...args:any[]) => {};
* new 表示该类型是可以被new操作符调用的
* ...args 表示构造器可以接受任意数量的参数
* any[] 表示构造器可以接受任意类型的参数
* {} 表示返回类型是对象(非null,非undefined的对象)
*
type Constructor = new(...args:any[]) => {};

function test(fn:Constructor) {}

class Person {}

test(Person)
*/
// ---------------------------------------------------------------------------------------------------------
/*
* 4.替换被装饰的类
*type Constructor = new(...args:any) => {}

interface Person {
    getTime():string
}
function LogTime<T extends Constructor>(target:T) {
    return class extends target {
        createdTime:Date
        constructor(...args:any[]) {
            super(...args)
            this.createdTime = new Date()
        }
        getTime() {
            return `该对象的读取时间是:${this.createdTime}`
        }
    }
}

@LogTime
class Person{
    name:string
    age:number
    constructor(name:string, age:number ){
        this.name = name;
        this.age = age
    }
    speak() {
        console.log('你好呀!')
    }
}

const p1 = new Person('张三',23);
console.log(p1.getTime())
*  */
//------------------------------------------------------------------------------------------------------------------
/*
* 5.装饰器工厂
* type Constructor = new (...args:any[]) => {}
interface Person{
    introduce():Function
}


function LogInfo(n:number) {
    return function(target:Constructor){
        target.prototype.introduce = function() {
            for(let i = 0; i < n; i++) {
                console.log(`我的名字:${this.name},我的年龄:${this.age}`)
            }
        }
    }
}

@LogInfo(5)
class Person {
    // constructor(
    //     public name:string,
    //     public age:number
    // ){}
    // speak() {
    //     console.log('你好呀')
    // }
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}

const p1 = new Person('张三',18)
p1.introduce()
* */
