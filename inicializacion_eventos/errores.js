const fs = require("fs").promises;
const path = require("path");
const proceso = require("process");
const chalk = require("chalk");
const directorio = path.join(__dirname, "../extras/error_log.txt");

module.exports = async () => {
  proceso.on("unhandledRejection", async (reason) => {
    console.log(chalk.bold.red(`Se ha hecho un logueo de un error en el código.`))
    const data = `[${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}]\n${reason.message}\n--------------------\n`;

    if (await fs.access(directorio).catch(() => false)) {
      const filedata = await fs.readFile(directorio, "utf8");
      await fs.writeFile(directorio, filedata + data, "utf8");
    } else {
      await fs.writeFile(directorio, data, "utf8");
    }
  });
};