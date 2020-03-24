### type和interface区别

### 一、共同点

#### 1.定义方法或对象

```javascript

interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}

```

```javascript

type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number): void;

```

#### 2.扩展与交叉类型

```javascript

interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

```

```javascript

type Name = { 
  name: string; 
}
type User = Name & { age: number  };

```

```javascript

type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

```

```javascript

interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}

```

### 二、不同点

#### 1.type

type 可以声明基本类型别名，联合类型，元组等类型

```javascript

// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

```

#### 2.interface

可以声明合并

```javascript

interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

```