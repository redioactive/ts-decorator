"use strict";
/*
* 1.访问器装饰器参数说明
* target:
* (1): 对于实例对象来说值是【所属类的原型对象】
* (2): 对于静态访问器来说是【所属类】
* propertyKey:访问器的名称
* descriptor:描述对象
* */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function RangeValidate(min, max) {
    return function (target, propertyKey, descriptor) {
        //保存原始的set方法，以便在后续调用中使用
        const originalSetter = descriptor.set;
        //重写 set方法 假如范围验证逻辑
        descriptor.set = function (value) {
            if (value < min || value > max) {
                throw new Error(`${propertyKey}的值应该在${min}到${max}之间!`);
            }
            if (originalSetter) {
                originalSetter.call(this, value);
            }
        };
    };
}
class Weather {
    constructor(_temp) {
        this._temp = _temp;
    }
    //设置温度范围在 -50 到 50之间
    set temp(value) {
        this._temp = value;
    }
    get temp() {
        return this._temp;
    }
}
__decorate([
    RangeValidate(-50, 50)
], Weather.prototype, "temp", null);
const w1 = new Weather(25);
console.log(w1);
w1.temp = 67;
console.log(w1);
