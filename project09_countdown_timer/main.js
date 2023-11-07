#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const DisplayTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const rem_seconds = seconds % 60;
    console.log(chalk.green(`${minutes.toString().padStart(2, "0")}:${rem_seconds.toString().padStart(2, "0")}`));
};
const countdown = (sec) => {
    let secondsleft = sec;
    const interval = setInterval(() => {
        if (secondsleft > 0) {
            DisplayTime(secondsleft);
            secondsleft--;
        }
        else if (secondsleft <= 0) {
            clearInterval(interval);
            console.log(chalk.green("Timer Finished"));
        }
    }, 1000);
};
const Timer = async () => {
    let input = await inquirer.prompt({
        name: "Input",
        type: "number",
        message: "Enter amount of seconds",
        validate: (value) => {
            if (isNaN(value)) {
                return "Enter a valid number";
            }
            else if (value > 60) {
                return "Enter number less than 60";
            }
            else {
                return true;
            }
        }
    });
    const userInput = input.Input;
    countdown(userInput);
};
Timer();
