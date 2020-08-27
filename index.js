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
    },
    {
      type: "input",
      message: "Usage Information",
      name: "Usage",
    },
    {
      type: "list",
      message: "Choose a license for your application...",
      name: "License",
      choices: ['MIT', 'mpl-2.0', 'apache-2.0', 'gpl-3.0', 'unlicense']
    },
    {
      type: "input",
      message: "Contribution Guidelines",
      name: "Contribution",
    },
    {
      type: "input",
      message: "Test Instructions",
      name: "Test",
    },
    {
      type: "input",
      message: "What is your Github username?",
      name: "Github",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "Email",
    },
  ]);

  
await writeFileAsync(
  "./README.md",
  `
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
  Feel free to contact me with any questions at ${response.Email} or [visit my Github page](https://github.com/${response.Github})
 
`
);

console.log(response);
};


try {
  userPrompt().catch((error) => {
    console.log("Invalid input", error);
  });
} catch (error) {
  console.log("Invalid input", error);
}