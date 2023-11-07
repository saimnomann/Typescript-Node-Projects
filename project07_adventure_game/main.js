#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
    }
    ReduceHealth() {
        this.health -= 25;
    }
    DrinkPortion() {
        this.health = 100;
    }
}
class Enemy {
    constructor(name) {
        this.name = name;
        this.health = 75;
    }
    ReduceHealth() {
        this.health -= 25;
    }
}
const Game = async () => {
    console.log(chalk.blue("Welcome tO Adventure Game"));
    const player = await inquirer.prompt({
        name: "Player",
        type: "input",
        message: "Enter the name of the player"
    });
    const enemy = await inquirer.prompt({
        name: "Enemy",
        type: "list",
        message: "Please Select Enemy you want to fight",
        choices: ["Skeleton", "Zombie", "Assasin"]
    });
    const p1 = new Player(player.Player);
    const e1 = new Enemy(enemy.Enemy);
    const SelectedOption = enemy.Enemy;
    console.log(chalk.green(p1.name) + " vs " + chalk.red(e1.name));
    while (p1.health > 0 && e1.health > 0) {
        let options = await inquirer.prompt({
            name: "Options",
            type: "list",
            choices: ["Attack Enemy", "Drink Health Potion", "Run for life"],
        });
        let opt = options.Options;
        if (opt === "Attack Enemy") {
            const num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.ReduceHealth();
                console.log(chalk.green(`Health of ${p1.name} is ${p1.health}`));
                console.log(chalk.red(`Health of ${e1.name} is ${e1.health} `));
            }
            else if (num <= 0) {
                e1.ReduceHealth();
                console.log(chalk.red(`Health of ${e1.name} is ${e1.health} `));
                console.log(chalk.green(`Health of ${p1.name} is ${p1.health}`));
                if (p1.health <= 0) {
                    console.log(chalk.red(`${p1.name} has been killed.Game Over!`));
                    process.exit();
                }
                if (e1.health <= 0) {
                    console.log(chalk.red(`${e1.name} has been killed.`));
                    process.exit();
                }
            }
        }
        else if (opt === "Drink Health Potion") {
            p1.DrinkPortion();
            console.log(chalk.green(`${p1.name} has drink health potion and its health has increased to ${p1.health}`));
        }
        else if (opt === "Run for life") {
            console.log(chalk.red("You have been killed.You are Defeated"));
            process.exit(0);
        }
    }
};
Game();
