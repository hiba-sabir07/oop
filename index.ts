#!/usr/bin/env node

import inquirer from 'inquirer';

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();
const programStart = async (persons: Person) => {
 do {
    console.log("Welcome!");

const ans = await inquirer.prompt([
         {
                name: "select",
                type: "list",
                message: "Whom would you like to interact with:",
                choices: ["Staff", "Student", "Exit"],
        }
 ]);

if (ans.select === "Staff") {
console.log("You have approached the staff room. Please feel free to ask any question.");
 } else if (ans.select === "Student") {
    const studentAns = await inquirer.prompt([
          {
                    name: "student",
                    type: "input",
                    message: "Enter the student's name you would like to engage with:",
          }

        ]);
            
const student = persons.students.find(val => val.name === studentAns.student);

 if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New student added");
 } else {
                console.log(`Student ${student.name} is already in the list.`);
            }

            console.log("Current student list:");
            console.log(persons.students.map(student => student.name).join(', '));
 } else if (ans.select === "Exit") {
            console.log("Exiting the program...");
            process.exit();
        }
 } while (true);
}

programStart(persons);
