#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let task = [];
let showTask = () => {
    if (task.length === 0) {
        console.log(chalk.blue("No task in the To-do list"));
    }
    else {
        for (let i = 0; i < task.length; i++) {
            console.log(`${i + 1})${task[i]}`);
        }
    }
};
let addTask = (newTask) => {
    task.push(newTask);
    console.log(chalk.green("Task added successfully"));
};
let deleteTask = (taskName) => {
    let taskIndex = task.indexOf(taskName);
    if (taskIndex !== -1) {
        let updatedtask = task.splice(taskIndex, 1);
        console.log(chalk.green("Task have been deleted"));
    }
    else {
        console.log(chalk.red("No task are found"));
    }
};
let todoFunc = async () => {
    let ans = await inquirer.prompt({
        name: "Options",
        type: "list",
        choices: ["Add Task", "View Task", "Delete Task", "Exit"],
        message: "Please select from the option"
    });
    if (ans.Options === "Add Task") {
        let add = await inquirer.prompt({
            name: "Add",
            type: "input",
            message: "Please add the task"
        });
        addTask(add.Add);
    }
    else if (ans.Options === "View Task") {
        showTask();
    }
    else if (ans.Options === "Delete Task") {
        if (task.length > 0) {
            let remove = await inquirer.prompt({
                name: "del",
                type: "list",
                choices: task,
                message: "Select the task you want to delete"
            });
            deleteTask(remove.del);
        }
        else {
            console.log(chalk.red("No Tasks Are Found"));
        }
    }
    else if (ans.Options === "Exit") {
        console.log(chalk.green("GoodBye!"));
        process.exit(0);
    }
    console.log(chalk.blue("Welcome to TODO App"));
};
while (true) {
    await todoFunc();
}
