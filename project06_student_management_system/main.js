#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("Student Management System"));
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
class Student extends Person {
    constructor(name, age) {
        super(name, age);
        this.courses = [];
        this.StudentId = Math.round(Math.random() * 100000);
        this.balance = 5000;
    }
    registerForCourses(course) {
        this.courses.push(course);
        this.submitFees(course.fees);
    }
    submitFees(fees) {
        this.balance -= fees;
    }
}
class Course {
    constructor(name, timing, fees) {
        this.students = [];
        ++Course.id;
        this.name = name;
        this.timing = timing;
        this.fees = fees;
    }
    addStudents(student) {
        this.students.push(student);
        student.registerForCourses(this);
    }
}
Course.id = 0;
const Students = [];
const courses = [];
let ans = async () => {
    let input = await inquirer.prompt({
        name: "Input",
        type: "rawlist",
        choices: ["Student", "Course"],
        message: "Please select one"
    });
    let selectedOption = input.Input;
    if (selectedOption === "Student") {
        let option = await inquirer.prompt({
            name: "Options",
            type: "rawlist",
            choices: ["Add Student", "View Student"]
        });
        let opt = option.Options;
        if (opt === "Add Student") {
            let AddStudent = await inquirer.prompt([{
                    name: "Name",
                    type: "input",
                    message: "Please Enter Student's Name"
                }, {
                    name: "Age",
                    type: "number",
                    message: "Please Enter Student's Age"
                }]);
            const student = new Student(AddStudent.Name, AddStudent.Age);
            Students.push(student);
            console.log(chalk.green("Student Added Succesfully"));
        }
        else if (opt === "View Student") {
            if (Students.length > 0) {
                console.log("List of Students");
                console.table(Students);
                let registerStudent = await inquirer.prompt({
                    name: "Options",
                    type: "input",
                    message: "Please type the index of the student you want to register for course"
                });
                let studentIndex = parseInt(registerStudent.Options);
                if (studentIndex >= 0 && studentIndex < Students.length) {
                    let selectedStudent = Students[studentIndex];
                    if (courses.length > 0) {
                        console.log("List of tables");
                        console.table(courses);
                    }
                    let selectcourse = await inquirer.prompt({
                        name: "SelectCourse",
                        type: "input",
                        message: "Please type the index of the course you want to register"
                    });
                    let selectedCourse = parseInt(selectcourse.SelectCourse);
                    if (selectedCourse >= 0 && selectedCourse < courses.length) {
                        let course = courses[selectedCourse];
                        if (course.students.includes(selectedStudent)) {
                            console.log(chalk.blue("You are already enrolled in this course"));
                        }
                        else {
                            if (selectedStudent.balance < course.fees) {
                                console.log(chalk.red("Insufficent balance in your account"));
                            }
                            else {
                                course.addStudents(selectedStudent);
                                console.log(chalk.green(`${selectedStudent.getName()} is enrolled in ${course.name}`));
                                console.log(chalk.green(`${course.fees} has been deducted from your account.Them remaining balance is ${selectedStudent.balance}`));
                            }
                        }
                    }
                    else {
                        console.log(chalk.red("Invalid Index"));
                    }
                }
                else {
                    console.log(chalk.red("Invalid Index"));
                }
            }
            else {
                console.log(chalk.red("No student Available at the moment"));
            }
        }
    }
    else if (selectedOption === "Course") {
        let option = await inquirer.prompt({
            name: "Options",
            type: "list",
            choices: ["Add Course", "View Course"]
        });
        let selectedOption = option.Options;
        if (selectedOption === "Add Course") {
            let course = await inquirer.prompt([{
                    name: "Name",
                    type: "input",
                    message: "Please enter the name of the course"
                }, {
                    name: "Timing",
                    type: "input",
                    message: "Please enter the timing of the course"
                },
                {
                    name: "Fees",
                    type: "number",
                    message: "Please enter the fees of the Course"
                }]);
            const course1 = new Course(course.Name, course.Timing, course.Fees);
            courses.push(course1);
            console.log(chalk.green("Course Added Succesfully"));
        }
        else if (selectedOption === "View Course") {
            if (courses.length > 0) {
                console.log("Student's List");
                console.table(Students);
            }
            else {
                console.log(chalk.blue("No courses to show"));
            }
        }
    }
    const exit = await inquirer.prompt({
        name: "Exit",
        type: "confirm",
        message: "Do you want to exit"
    });
    if (exit.Exit) {
        process.exit(0);
    }
    else {
        ans();
    }
};
ans();
