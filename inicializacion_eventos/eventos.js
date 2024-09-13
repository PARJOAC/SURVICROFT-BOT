const { readdirSync } = require('fs');
const path = require("path");
const chalk = require("chalk");

module.exports = async (client) => {
  const eventosPath = path.join(__dirname, "../bot/eventos");
  const files = await readdirSync(eventosPath);
  for (const file of files) {
    if (file.endsWith(".js")) {
      const eventName = file.slice(0, -3);
      client.on(eventName, require(path.join(eventosPath, file)).bind(null, client));
    }
  }
  console.log(chalk.bold.blue(`Se han iniciado correctamente todos los eventos de ${client.user.username}.`))
};