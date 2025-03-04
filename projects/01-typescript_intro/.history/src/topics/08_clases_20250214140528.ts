


class Person {

    public name: string;
    private address: string;

    constructor() {
        this.name = "Juanma";
        this.address = "Calle Falsa 123";
    }
}

const ironman = new Person();
console.log(ironman.address);