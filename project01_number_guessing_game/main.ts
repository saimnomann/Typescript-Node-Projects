#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let randomNum=Math.floor(Math.random()*10);

async function playgame () {
    for(let i=0;i<3;i++){
    let userInputNum= await inquirer.prompt({
        name:"num1",
        message:"Guess the number between 0 and 9",
        type:"number",
    })
let userNum=userInputNum.num1
 if(randomNum==userNum){
    console.log(chalk.green("Congratulation You have won"));
    return;
 }
 else{
    console.log(chalk.red("Please Try Again"));
 }
    }
    console.log(chalk.yellow("You have lost"));
 console.log(chalk.yellow(`The answer is ${randomNum}`));
}
playgame();



