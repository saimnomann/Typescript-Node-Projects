#! /usr/bin/env node
import inquirer from "inquirer";
let word_counter = async () => {
    let counter = await inquirer.prompt({
        name: "Para",
        type: "input",
        message: "Please write the paragraph"
    });
    let ans = counter.Para;
    let count_words = ans.split(" ").filter((count) => count != "");
    let count_letters = count_words.join("");
    console.log(`The toal words in your paragraph is ${count_words.length} and total letters in your paragraph is ${count_letters.length}.`);
};
word_counter();
