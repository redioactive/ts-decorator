
/*
* 1,属性装饰器参数说明
* target: 对于静态属性来说值是类，对于实例属性来说值是类的原型对象
* propertyKey: 属性名
*
* function Demo(target:object,propertyKey:string) {
    console.log(target,propertyKey)
}
class PersonStats {
    @Demo name:string
    @Demo age:number

    @Demo static school:string // class PersonStats {constructor(name, age) {this.name = name;this.age = age;}} 'school'
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}
* */

//-----------------------------------------------------------------------------------------------------------------------

// 2.关于属性遮蔽
/*
*
* class PersonStats {
    name:string
    age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}
let value = 130
Object.defineProperty(PersonStats.prototype,'age',{
    get() {
        return value
    },
    set(val) {
        value = val
    }
})
const p2 = new PersonStats('张三',18)

*/

//---------------------------------------------------------------------------------------------------------------------

/*
* 3.属性装饰器应用实例
* */

function State(target:object,propertyKey:string) {
    let key = `__${propertyKey}`
    Object.defineProperty(target,propertyKey,{
        get(){
            return this[key]
        },
        set(newValue){
            console.log(`${propertyKey}最新值为:${newValue}`)
            this[key] = newValue
        }
    })
}
class PersonStats {
    name:string
    @State age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}

const p2 = new PersonStats('张三',29);
const p3 = new PersonStats('李三',30);
console.log(p2.name,p2.age);
console.log(p3.name,p3.age)