



function addNumbers(a: number, b: number): number {
    return a + b;
}

const addNumbersArrow = (a: number, b: number): string => `${ a + b }`;

function multiply(firstNumber: number, secondNumber?: number, base = 2 ) {
    return firstNumber * base 
}

// const result: string = addNumbers(1, 2).toString();
// const resultArrow: string = addNumbersArrow(1, 2).toString();
// const multiplyResult: number = multiply(5);

interface Character {
    name: string;
    pv: number;
    showHp: () => void;
}

const healCharacter = ( character: Character, amount: number ) => {
    character.pv += amount;
}

const strider: Character = {
    name: "Strider",
    pv: 50,
    showHp() {
        console.log(`Puntos de vida: ${ this.pv }`)
    }
}

healCharacter( strider, 10);

strider.showHp();