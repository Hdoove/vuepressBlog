

// function getVal<T, U extends keyof T>(obj:T, key: U) {
//     return obj[key];
// }

// const obj = {
//     a: 1,
//     b: 'lj'
// }

// console.log(getVal(obj, 'b'));


// interface Props {
//     name: number;
//     age: number;
// }

// interface ObjP extends Props {
//     address: string;
// }

// type objProps =
//     {
//         name: number;
//         age: number;
//     }

// const obj: objProps & { address: string } = {
//     name: 1,
//     age: 1,
//     address: '1'
// }

// interface Props {
//     length: number;
// }

// interface ObjP {
//     name: string;
// }

// function getLength(obj: Props & ObjP) {
//     return obj.length;
// }

// console.log(getLength({ name: 'W1' }))

// function getValue1<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
//     return names.map(n => obj[n]);
// }

// let obj11 = {
//     name: 1,
//     age: 2
// }

// console.log(getValue1(obj11, ['name']));

// interface Type {
//     a: never;
//     b: number;
//     c: string;
//     d: undefined;
// }

// type Test = Type[keyof Type];


// 映射类型

// interface interface {
//     age: number;
//     name: string;
// }

// type ReadonlyType<T> = {
//     readonly [P in keyof T]: T[P]
// }

// type ReadonlyInfo1 = ReadonlyType<interface>;

// // typescript 帮我们内置了 Readonly Partial

// type ReadonlyInfo2 = Readonly<interface>; // 只读
// type ReadonlyInfo3 = Partial<interface>; // 可选

// // 另外两个内置映射类型 Pick Record

// type Pick1<T, K extends keyof T> = {
//     [P in K]: T[P]
// }

// type Info1 = Pick1<interface, 'age'>

// type Record1<K extends keyof any, T> = {
//     [P in K]: T
// }

// function pick<T, K extends keyof T>(obj: T, names: Array<K>): Pick<T, K> {
//     let res: any = {};

//     names.map(item => {
//         res[item] = obj[item];
//     });

//     return res;
// }

// console.log(pick({ name: 1, age: 2 }, ['name', 'age']))

// type Proxy<T> = {
//     get(): T;
//     set(val: T): void;
// }

// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>
// }

// function proxify<T>(obj: T): Proxify<T> {
//     const result = {} as Proxify<T>;

//     for (const key in obj) {
//         result[key] = {
//             get: () => obj[key],
//             set: (value) => obj[key] = value
//         }
//     }

//     return result;
// }

// let props = {
//     name: 'hdove',
//     age: 25
// }

// let proxyProps = proxify(props);
// console.log(proxyProps);

//  
