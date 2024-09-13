const chalk = require("chalk");

module.exports = async (client, error) => {
  console.log(chalk.bold.blue(`WARN:` + String(error)));
}