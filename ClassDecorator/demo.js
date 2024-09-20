"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//装饰器
function CustomString(target) {
    target.prototype.toString = function () {
        return JSON.stringify(this);
    };
    // 封闭原型对象，禁止随意操作其原型对象
    Object.seal(target.prototype);
}
//装饰器工厂
function LogInfo(n) {
    return function (target) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(`我的名字:${this.name},我的年龄:${this.age}`);
            }
        };
    };
}
//装饰器
//创建一个装饰器，为类添加日志功能和创建时间
function LogTime(target) {
    return class extends target {
        constructor(...args) {
            super(...args);
            this.createdTime = new Date();
        }
        getTime() {
            return `该对象的创建时间为:${this.createdTime}`;
        }
    };
}
let Person = class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log('你好呀!');
    }
};
Person = __decorate([
    CustomString,
    LogInfo(4),
    LogTime
], Person);
const p1 = new Person('张三', 12);
console.log(p1);
p1.speak();
console.log(p1.toString());
p1.introduce();
console.log(p1.getTime());
