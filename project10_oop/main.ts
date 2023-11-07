import inquirer from "inquirer";

class Person {
    personality:string;

    constructor(){
        this.personality="Mystery";
    }
askQuestion(num:number){
    if(num===1){
        this.personality="extrovert";
    }
    else if(num===2){
   this.personality="introvert"
    }
    else{
    this.personality="mystery"
    }
}
getPersonality(){
    return this.personality
}
}
class Student extends Person {
     private name;
     constructor(){
        super();
        this.name=""
     }
get Name (){
return this.name
}
set Name(val:string){
    this.name=val
}
}

const input= await inquirer.prompt({
    name:"Input",
    type:"rawlist",
    message:"Please Answer to know your personality",
    choices:["Do you like to talk to others","Do you rather keep to yourself"]
})
const userInput=input.Input;
const person=new Person()
if(userInput==="Do you like to talk to others"){
    person.askQuestion(1)
}
else if(userInput === "Do you rather keep to yourself"){
person.askQuestion(2)
}

const inputName=await inquirer.prompt({
    name:"Name",
    type:"input",
    message:'What is your Name'
}) 
const studentName=inputName.Name;

const NewStudent=new Student();
NewStudent.askQuestion(userInput);

NewStudent.Name=studentName;

console.log(`My name is ${NewStudent.Name} and your personality is ${person.getPersonality()}`)
