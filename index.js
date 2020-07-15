var file_test = require("fs");
var inquirer_test = require("inquirer");
var request_test = require("request-promise");

inquirer_test
  .prompt([
    {
      type: "input",
      name: "Project_Title",
      message: "What is your Project Title",
    },
    {
      type: "input",
      name: "Description",
      message: "what is your project description",
    },
    {
      type: "Input",
      name: "TOC",
      message: "Please write table of contents",
    },
    {
      type: "Input",
      name: "username",
      message: "github username",
    },
  ])
  .then(function (answers) {
    request_test
      .get("https://api.github.com/users/" + answers.username, {
        headers: { "User-Agent": "test_test" },
      })
      .then(function (res) {
        res = JSON.parse(res);
        let test_data =
          "# project title:  " +
          answers.Project_Title +
          "\n # Descrption: " +
          answers.Description +
          "\n # TOC: " +
          answers.TOC +
          "\n # email: " +
          res.email +
          "\n ![alt text](" +
          res.avatar_url +
          "?raw=true)";
        file_test.writeFile("readme.md", test_data, function (err) {
          if (err) console.log(err);
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(answers);
  });
