#! /usr/bin/env node
import inquirer from "inquirer";
import { sum } from "./operators/add.js";
import { difference } from "./operators/subtract.js";
import { product } from "./operators/multiply.js";
import { quotient } from "./operators/div.js";
let { num1, num2, operators } = await inquirer.prompt([{
        name: "num1",
        message: "Enter your first number",
        type: "number"
    },
    {
        name: "num2",
        message: "Enter your second number",
        type: "number"
    },
    {
        name: "operators",
        message: "Selector Operator?",
        type: "list",
        choices: ["+", "-", "*", "/"]
    }]);
if (operators === "+") {
    console.log(`The result will be ${sum(num1, num2)}`);
}
else if (operators === "-") {
    console.log(`The result is ${difference(num1, num2)}`);
}
else if (operators === "*") {
    console.log(`The result is ${product(num1, num2)}`);
}
else if (operators === "/") {
    console.log(`The result is ${quotient(num1, num2)}`);
}
