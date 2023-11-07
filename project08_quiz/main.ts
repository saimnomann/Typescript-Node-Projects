//  #! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const Game=async()=>{
    console.log(chalk.red("Welcome to the quiz"));
const userName=await inquirer.prompt({
    name:"Name",
    type:"input",
    message:"Enter your Name",
})
const Name=userName.Name

if(Name){
    const Question=await inquirer.prompt([{
        name:"question1",
        type:"rawlist",
        message:"What will be the output of the following code?\nlet a=20 \nlet b=30\nconsole.log(a+b)",
        choices:["50","30+20","Error","None of these"]
    },{
        name:"question2",
        type:"rawlist",
        message:"Which one is not the data type in Typescript?",
        choices:["symbol","int","string","boolean"]
    },{
        name:"question3",
        type:"rawlist",
        message:"What will be the output of the following code?\n let message='Hello World'\nconsole.log(message)",
        choices:["Hello World","message","Error","None of these"]
    },{
        name:"question4",
        type:"rawlist",
        message:"Which keyword is used to define a constant in TypeScript?",
        choices:["let","var","static","const"]
    },{
        name:"question5",
        type:"rawlist",
        message:"Which one is not an arithematic operator",
        choices:["+","=","%","*"]
    }])
  let correctCount=0
const q1=Question.question1;
const q2=Question.question2;
const q3=Question.question3;
const q4=Question.question4;
const q5=Question.question5;

if(q1==="50"){
    ++correctCount;
}
if(q2==="int"){
    ++correctCount;
}
if(q3==="Hello World"){
    ++correctCount;
}
if(q4==="const"){
++correctCount;
}
if(q5==="="){
    ++correctCount;
}
let result=`${Name} you scored ${correctCount} out of 5`
if(correctCount<3){
    console.log(chalk.red(result));
}
else{
    console.log(chalk.green(result))
}
}}
Game()