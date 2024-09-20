"use strict";
/*
* 1.方法装饰器参数说明
* target: 对于静态方法来说值是类，对于实例方法来说值是原型对象
* propertyKey: 方法的名称
* descriptor: 方法的描述对象，其中value属性是被装饰的方法
* */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(target, propertyKey, descriptor) {
    // 缓存原始方法
    const origin = descriptor.value;
    // 替换原始方法
    descriptor.value = function (...args) {
        console.log(`${propertyKey}开始执行了....`);
        const result = origin.call(this, ...args);
        console.log(`${propertyKey}执行结束!`);
        return result;
    };
}
function Validate(maxValue) {
    return function (target, propertyKey, descriptor) {
        //保存原始方法
        const original = descriptor.value;
        //替换原始方法
        descriptor.value = function (...args) {
            //自定义的验证逻辑
            if (args[0] > maxValue) {
                throw new Error('年龄非法!');
            }
            // 如果所有参数都符合要求，则调用原始方法
            return original.apply(this, args);
        };
    };
}
class PersonMethods {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak(str) {
        console.log(`你好呀! 我的名字是${this.name},我的年龄是${this.age},${str}`);
    }
    static isAdult(age) {
        return age >= 18;
    }
}
__decorate([
    Logger
], PersonMethods.prototype, "speak", null);
__decorate([
    Validate(120)
], PersonMethods, "isAdult", null);
const p5 = new PersonMethods('张三', 20);
p5.speak('hello');
const message = PersonMethods.isAdult(1);
console.log(message);
