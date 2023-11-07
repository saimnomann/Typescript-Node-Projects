#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Customer {
    constructor(firstName, lastName, age, pin, Gender, mobileNumber, userId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.pin = pin;
        this.Gender = Gender;
        this.userId = userId;
        this.mobileNumber = mobileNumber;
        this.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    }
    customerInfo() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            Age: this.age,
            Gender: this.Gender,
            mobileNumber: this.mobileNumber,
            AccountNumber: this.accountNumber,
            pin: this.pin
        };
    }
}
class BankAccount {
    constructor() {
        this.customer = [];
        this.accountBalance = 100;
    }
    AddCustomer(customers) {
        this.customer.push(customers);
    }
    debit(amount) {
        if (amount > this.accountBalance) {
            console.log(chalk.red("Insufficient Amount in your BankAccount"));
        }
        if (amount < this.accountBalance) {
            this.accountBalance = this.accountBalance - amount;
            console.log(chalk.green(`$${amount} have been deducted from your account.The amount remaining in your account is $${this.accountBalance} `));
        }
    }
    credit(amount) {
        if (amount > 0) {
            this.accountBalance = this.accountBalance + amount;
            console.log(chalk.green(`$${amount} have been added in your account.The balance in your account is $${this.accountBalance}`));
        }
        if (amount > 100) {
            this.accountBalance = this.accountBalance - 1;
            console.log(chalk.green(`${amount} credited in your account`));
        }
    }
    displaybalance() {
        console.log(chalk.green(`The balance in your account is $${this.accountBalance}`));
    }
    displayInfo(currentUser) {
        const user = this.customer.find(customer => customer.userId === currentUser);
        if (user) {
            console.log(chalk.blue("User Information"));
            console.log(user.customerInfo());
        }
        else {
            console.log(chalk.red("No users found"));
        }
        console.log(this.customer);
    }
}
const bankAccount = new BankAccount();
let currentUser = null;
const findUserById = (userId) => {
    return bankAccount.customer.find((user) => user.userId == userId);
};
const Bank = async () => {
    const login = await inquirer.prompt([{
            name: "Userlogin",
            type: "list",
            message: "Please Select One",
            choices: ["Create Account", "Sign-In"]
        }]);
    if (login.Userlogin === "Create Account") {
        const userDetails = await inquirer.prompt([{
                name: "firstName",
                type: "input",
                message: "Enter your firstName",
                validate: (value) => {
                    if (value) {
                        return true;
                    }
                    else {
                        return chalk.red("Enter valid FirstName");
                    }
                }
            }, {
                name: "lastName",
                type: "input",
                message: "Enter your lastName",
                validate: (value) => {
                    if (value) {
                        return true;
                    }
                    else {
                        return chalk.red("Enter valid LastName");
                    }
                }
            },
            {
                name: "Age",
                type: "number",
                message: "Enter your age",
                validate: (value) => {
                    if (isNaN(value)) {
                        return chalk.red("Please enter a valid number");
                    }
                    if (value < 18) {
                        return (chalk.red("You must be greater than 18"));
                    }
                    else {
                        return true;
                    }
                }
            }, {
                name: "Pin",
                type: "number",
                message: "Enter your pincode",
                validate: (value) => {
                    if (isNaN(value)) {
                        return chalk.red("Please enter a valid number");
                    }
                    else {
                        return true;
                    }
                }
            },
            { name: "Gender",
                type: "list",
                message: "Select your Gender",
                choices: ["Male", "Female"]
            }, {
                name: "mobileNumber",
                type: "input",
                message: "Enter your mobile Number",
                validate: (value) => {
                    if (/^\d{11}$/.test(value)) {
                        return true;
                    }
                    else {
                        return chalk.red("Please enter a 10-digit mobile number");
                    }
                }
            }, {
                name: "UserId",
                type: "number",
                message: "Enter your userID",
                validate: (value) => {
                    if (isNaN(value)) {
                        return chalk.red("Please enter a valid number");
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        const userInfo = new Customer(userDetails.firstName, userDetails.lastName, userDetails.Age, userDetails.Pin, userDetails.Gender, userDetails.mobileNumber, userDetails.UserId);
        bankAccount.AddCustomer(userInfo);
        console.log(chalk.green("Account registered succesfully"));
    }
    if (login.Userlogin === "Sign-In") {
        const userlogin = await inquirer.prompt([{
                name: "UserId",
                type: "number",
                message: "Enter your UserId",
                validate: (value) => {
                    if (isNaN(value)) {
                        return (chalk.red("Invalid number"));
                    }
                    else if (!value) {
                        return (chalk.red("please enter UserID"));
                    }
                    else {
                        return true;
                    }
                }
            }, {
                name: "Password",
                type: "number",
                message: "Enter your Pincode",
                validate: (value) => {
                    if (isNaN(value)) {
                        return (chalk.red("Invalid number"));
                    }
                    else if (!value) {
                        return (chalk.red("please enter Pincode"));
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        const userId = userlogin.UserId;
        const password = userlogin.Password;
        const user = findUserById(userId);
        if (user) {
            if (user.pin === password) {
                console.log(chalk.green("Sign-In Successful"));
                currentUser = user;
                const userChoices = await inquirer.prompt({
                    name: "userchoices",
                    type: "rawlist",
                    message: "Please Select One",
                    choices: ["Debit", "Credit", "Show Balance", "Show Account Info"]
                });
                if (userChoices.userchoices === "Debit") {
                    const amount = await inquirer.prompt({
                        name: "Amount",
                        type: "number",
                        message: "Please enter the amount you want to debit",
                    });
                    bankAccount.debit(amount.Amount);
                }
                if (userChoices.userchoices === "Credit") {
                    const amount = await inquirer.prompt({
                        name: "Amount",
                        type: "number",
                        message: "Enter the amount you want to credit"
                    });
                    bankAccount.credit(amount.Amount);
                }
                else if (userChoices.userchoices === "Show Account Info") {
                    bankAccount.displayInfo(currentUser);
                }
                else if (userChoices.userchoices === "Show Balance") {
                    bankAccount.displaybalance();
                }
            }
            else {
                console.log(chalk.red("Invalid UserId or password"));
            }
        }
        else {
            console.log(chalk.red("No Account found"));
        }
    }
    const exit = await inquirer.prompt({
        name: "Exit",
        type: "confirm",
        message: "Do you want to exit"
    });
    if (exit.Exit) {
        process.exit();
    }
    else {
        while (true) {
            await Bank();
        }
    }
};
Bank();
