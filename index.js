const fs = require("fs");
const inquirer = require("inquirer");
const { async } = require("rxjs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const userPrompt = async () => {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your page?",
      name: "Title",
    },
    {
      type: "input",
      message: "Please give a description of your project?",
      name: "Description",
    },
    {
      type: "input",
      message: "Installation Instructions",
      name: "Installation",
      default: "No installation information is available",
    },
    {
      type: "input",
      message: "Usage Information",
      name: "Usage",
      default: "No usage information is available",
    },
    {
      type: "list",
      name: "License",
      message: "Choose a License for your application please...",
      choices: ["MIT", "ISC", "Unlicense"],
    },
    {
      type: "input",
      message: "Contribution Guidelines",
      name: "Contribution",
      default: "No contribution information is available",
    },
    {
      type: "input",
      message: "Test Instructions",
      name: "Test",
      default: "No testing information is available",
    },
    {
      type: "input",
      message: "What is your Github username?",
      name: "Github",
      filter: function (answers) {
        if (answers) {
          return `https://github.com/${answers}`;
        } else {
          return "No GitHub link was entered";
        }
      },
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "Email",
      filter: function (answers) {
        if (answers) {
          return `${answers}`;
        } else {
          return "No email address was entered";
        }
      },
    },
  ]);

  await writeFileAsync(
    "./README.md",
    `
  [![License: ISC](https://img.shields.io/badge/License-${response.License}-blue.svg)](https://opensource.org/licenses/${response.License})
  # ${response.Title}   

  ## Table of Contents
  [Title](#title)  
  [Description](#description)  
  [Installation](#installation)  
  [Usage](#usage)  
  [License](#license)  
  [Github](#github)  
  [Email](#email)  
  

  ## Description:   
   
   ${response.Description}   


  ## Installation:   

  ${response.Installation}
  
  ## Usage:   

  ${response.Usage}

  ## License:   

  ${response.License}

  ## Contribution:   

  ${response.Contribution}

  ## Test Instructions:   

  ${response.Test}


  ## Questions:
  Feel free to contact me with any questions at ${response.Email} or [visit my Github page](${response.Github})
 
`
  );
};

try {
  userPrompt().catch((error) => {
    console.log("Invalid input", error);
  });
} catch (error) {
  console.log("Invalid input", error);
}
