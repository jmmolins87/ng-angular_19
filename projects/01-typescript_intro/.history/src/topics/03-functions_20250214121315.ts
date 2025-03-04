



function addNumbers(a: number, b: number) {
    return a + b;
}

const addNumbersArrow = (a: number, b: number) => a + b;

const result: string = addNumbers(1, 2).toString();
const resultArrow: string = addNumbersArrow(1, 2).toString();

console.log({ result });
console.log({ resultArrow });