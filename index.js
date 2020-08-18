function Parent() {
    this.name = 'lj';
    this.age = 25;
}

function Child() {
    Parent.call(this);
    this.address = '天津';
}

const p = Parent.prototype;
Child.constructor = p;
