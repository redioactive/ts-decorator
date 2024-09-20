

/*
* 1.参数装饰器参数说明
* target:
* (1): 如果修饰的是【实例方法】的参数，target是类的【原型对象】
* (2): 如果修饰的是【静态方法】的参数, target是类
* propertyKey: 参数所在的方法的名称
* parameterIndex: 参数在函数参数列表中的索引，从0开始
* */

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

function NotNumber(target:any,propertyKey:string,parameterIndex:number) {
    //初始化、获取当前方法的参数索引列表
    let notNumberArr:number[] = target[`__notNumber_${propertyKey}`] || [];
    //将当前参数索引添加到列表中
    notNumberArr.push(parameterIndex);
    //将列表存储回目标对象
    target[`__notNumber_${propertyKey}`] = notNumberArr;
}

function Validates(target:any,propertyKey:string,descriptor:PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args:any[]) {
        //获取当前方法的参数索引列表
        const notNumberParameters:number[] = target[`__notNumber_${propertyKey}`] || [];

        //验证参数
        notNumberParameters.forEach(parameterIndex => {
            if(typeof args[parameterIndex] === 'number') {
                throw new Error(`参数下标${parameterIndex},使用方法${propertyKey}不能是一个数字`)
            }
        });
        //调用原始方法
        return original.apply(this,args)
    }
}
class ArgumentDecorator {
    @Validates
    speak(@NotNumber message:any) {
        console.log("Message:",message)
    }
}

const person2 = new ArgumentDecorator();
person2.speak('hello')
person2.speak(123)