
class Parent {
    constructor(name) {
        this.name = name;
        this.age = 25;
    }

    getName() {
        console.log(this.name)
        return this.name;
    }

    setName(str) {
        this.name = str;
    }
}

class Child extends Parent {
    constructor(name) {
        super(name);
    }
}

const child = new Child('lj');

child.getName();
child.setName('hd');
child.getName()
