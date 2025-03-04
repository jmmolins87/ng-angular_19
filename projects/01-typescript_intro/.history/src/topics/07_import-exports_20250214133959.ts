
import { Product, taxCalculation } from './06_function-destructuring';


const shoppingCart: Product[] = [
    {
        description: "iPhone",
        price: 1299
    }, 
    {
        description: "MacBook Pro",
        price: 2299
    }
];

// Tax = 0.15%
const [total, tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.15
});

console.log("Total", total);
console.log("Tax", tax);