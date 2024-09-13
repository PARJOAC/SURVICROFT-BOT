const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { readdirSync } = require("fs");
const chalk = require("chalk");

module.exports = async (client) => {
  async function subFolder(folder) {
    const files = await readdirSync(`./bot/comandos/${folder}`);
    for (const file of files) {
      if (file.endsWith(".js")) {
        const fileContents = require(`../bot/comandos/${folder}/${file}`);
        await client.slash.set(fileContents.data.name, fileContents);
        await client.dataArray.push(fileContents.data.toJSON());
      }
    }
  }

  const folders = ["general", "mod", "musica"];
  for (const folder of folders) {
    await subFolder(folder);
  }
try {
  const rest = new REST().setToken(process.env.BOT_TOKEN);

  await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
    body: client.dataArray,
  });
  
  console.log(chalk.bold.blue(`Se han iniciado correctamente todos los slash.`))
} catch(e) {
  console.error(e);
}

  
}
