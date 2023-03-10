const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var team = []

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
function getManagerInfo() {
    inquirer
  .prompt([
    {
        type: 'input',
        message: `Name of the team manager's`,
        name: 'name'
    },
    {
        type: 'input',
        message: 'Employee ID',
        name: 'id'
    },
    {
        type: 'input',
        message: 'e-mail',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Office number',
        name: 'office'
    },
  ])
  .then((response) => {
    team.push(new Manager(response.name, response.id, response.email, response.office));
    console.log(`Employee ${response.id} successfully added.
    `)
    menuOptions();
  });
}

function getEngineerInfo() {
    inquirer
  .prompt([
    {
        type: 'input',
        message: `Engineer's name`,
        name: 'name'
    },
    {
        type: 'input',
        message: 'Employee ID',
        name: 'id'
    },
    {
        type: 'input',
        message: 'e-mail',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Github username',
        name: 'github'
    },
  ])
  .then((response) => {
    team.push(new Engineer(response.name, response.id, response.email, response.github));
    console.log(`Employee ${response.id} successfully added.
    `)
    menuOptions();
  });
}

function getInternInfo() {
    inquirer
  .prompt([
    {
        type: 'input',
        message: `Intern's name`,
        name: 'name'
    },
    {
        type: 'input',
        message: 'Employee ID',
        name: 'id'
    },
    {
        type: 'input',
        message: 'e-mail',
        name: 'email'
    },
    {
        type: 'input',
        message: 'School',
        name: 'school'
    },
  ])
  .then((response) => {
    team.push(new Intern(response.name, response.id, response.email, response.school));
    console.log(`Employee ${response.id} successfully added.
    `)
    menuOptions();
  });
}

function menuOptions() {
    inquirer
  .prompt([
    {
        type: 'list',
        message: `Please select an option`,
        choices : ['Add an engineer', 'Add an intern', 'Finish building the team'],
        name: 'option',
    },
  ])
  .then((response) => {
    console.log(response)
    switch (response.option) {
        case 'Add an engineer':
            getEngineerInfo();
            break;
        case 'Add an intern':
            getInternInfo();
            break;
        case 'Finish building the team':
            writeToFile(outputPath, render(team));
            break;
    }
  });
}

function writeToFile (fileName, data) {
  fs.writeFile(fileName, data, (err) =>
  err ? console.error(err) : console.log('Success!')
  );
}

function init() {
getManagerInfo();
}

init();

