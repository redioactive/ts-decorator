"use strict";
/*
* 1.参数装饰器参数说明
* target:
* (1): 如果修饰的是【实例方法】的参数，target是类的【原型对象】
* (2): 如果修饰的是【静态方法】的参数, target是类
* propertyKey: 参数所在的方法的名称
* parameterIndex: 参数在函数参数列表中的索引，从0开始
* */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// function NotNumber(target: object, propertyKey: string | symbol, parameterIndex: number) {
//     const existingNotNumberParameters: number[] = Reflect.getOwnMetadata("notNumber", target, propertyKey) || [];
//     existingNotNumberParameters.push(parameterIndex);
//     Reflect.defineMetadata("notNumber", existingNotNumberParameters, target, propertyKey);
// }
//
// function Validate(target: object, propertyName: string, descriptor: PropertyDescriptor) {
//     const method = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         const notNumberParameters: number[] = Reflect.getOwnMetadata("notNumber", target, propertyName);
//         if (notNumberParameters) {
//             for (let parameterIndex of notNumberParameters) {
//                 if (typeof args[parameterIndex] === 'number') {
//                     throw new Error(`参数${parameterIndex},方法${propertyName},不是一个数字`);
//                 }
//             }
//         }
//         return method.apply(this, args);
//     }
// }
//
// class ArgumentPerson {
//     @Validate
//     speak(@NotNumber message: any) {
//     }
// }
//
// const person = new ArgumentPerson();
// person.speak('hello world');
// person.speak(123)
function NotNumber(target, propertyKey, parameterIndex) {
    //初始化、获取当前方法的参数索引列表
    let notNumberArr = target[`__notNumber_${propertyKey}`] || [];
    //将当前参数索引添加到列表中
    notNumberArr.push(parameterIndex);
    //将列表存储回目标对象
    target[`__notNumber_${propertyKey}`] = notNumberArr;
}
function Validates(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        //获取当前方法的参数索引列表
        const notNumberParameters = target[`__notNumber_${propertyKey}`] || [];
        //验证参数
        notNumberParameters.forEach(parameterIndex => {
            if (typeof args[parameterIndex] === 'number') {
                throw new Error(`参数下标${parameterIndex},使用方法${propertyKey}不能是一个数字`);
            }
        });
        //调用原始方法
        return original.apply(this, args);
    };
}
class ArgumentDecorator {
    speak(message) {
        console.log("Message:", message);
    }
}
__decorate([
    Validates,
    __param(0, NotNumber)
], ArgumentDecorator.prototype, "speak", null);
const person2 = new ArgumentDecorator();
person2.speak('hello');
person2.speak(123);
