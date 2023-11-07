#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let Id = 123;
let pass = 12345;
let balance = 1000;
console.log(chalk.blue("Please Enter your Card"));
setTimeout(() => {
    console.log(chalk.red("Processing Please wait..."));
}, 1000);
setTimeout(() => {
    let login = async () => {
        let userInput = await inquirer.prompt([
            {
                type: "input",
                name: "user_id",
                hint: console.log(`Hint :\nId:${chalk.dim(Id)}\nPin:${chalk.dim(pass)}`),
                message: chalk.blue(`Enter your id`)
            },
            {
                type: "number",
                name: "pin",
                message: (chalk.green("Enter your pincode")),
            }
        ]);
        let id = userInput.user_id;
        let pincode = userInput.pin;
        let islogin = () => {
            setTimeout(() => {
                if (id == Id && pincode == pass) {
                    console.log(chalk.green("Authentication Succesful"));
                    let atm_function = async () => {
                        let transaction_types = await inquirer.prompt({
                            type: "list",
                            name: "transaction_Types",
                            choices: ["Withdraw", "Cash Deposit", "Check Balance", "Exit"],
                            message: "Select the type of transaction you want"
                        });
                        let selectedTransaction = transaction_types.transaction_Types;
                        if (selectedTransaction === "Withdraw" || selectedTransaction === "Cash Deposit") {
                            let amount = async () => {
                                let atm_Amount = await inquirer.prompt({
                                    name: "Amount",
                                    type: "list",
                                    message: "Please select the amount",
                                    choices: ["500", "1000", "2000", "5000"]
                                });
                                let selectedAmount = parseInt(atm_Amount.Amount);
                                if (selectedTransaction === "Withdraw") {
                                    if (balance >= selectedAmount) {
                                        let deductedAmount = balance - selectedAmount;
                                        console.log(chalk.green(`$${selectedAmount} have been withdrawn successfully.The current balance in your account is$${deductedAmount}`));
                                        balance = deductedAmount;
                                    }
                                    else {
                                        console.log(chalk.red("Insufficent Balance"));
                                    }
                                }
                                else if (selectedTransaction === "Cash Deposit") {
                                    let DepositedAmount = balance + selectedAmount;
                                    console.log(chalk.green(`$${selectedAmount} hace been deposited in your account.The current balance in your account${DepositedAmount}`));
                                    balance = DepositedAmount;
                                }
                            };
                            amount();
                        }
                        else if (selectedTransaction === "Check Balance") {
                            console.log(chalk.blue(`The current balance in your account is $${balance}`));
                        }
                        else if (selectedTransaction === "Exit") {
                            console.log(chalk.green("Thanks for using Atm"));
                        }
                    };
                    atm_function();
                }
                else {
                    console.log(chalk.red("Invalid userid or password"));
                }
            }, 2000);
        };
        console.log(chalk.red("Plz wait...."));
        islogin();
    };
    login();
}, 3000);
