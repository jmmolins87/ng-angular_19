



function addNumbers(a: number, b: number): number {
    return a + b;
}

const addNumbersArrow = (a: number, b: number): string => `${ a + b }`;

const result: string = addNumbers(1, 2).toString();
const resultArrow: string = addNumbersArrow(1, 2).toString();

console.log({ result });
console.log({ resultArrow });