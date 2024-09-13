const mcs = require('node-mcstatus');
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Ver información sobre el servidor de Minecraft"),
  usage: "Ver información sobre el servidor de Minecraft",
  n: "</server:1196138621821005870>",
  category: "general",
  name: "server",
  execute: async (interaction, client) => {
try {
  
   const result = await mcs.statusJava("flowbox.fun", 25565, { query: true });
    
    let estado;
    if(result.online === true) {
      estado = "🟢 En línea"
    } else {
      estado = "🔴 Apagado"
    };
    
          const embed = new EmbedBuilder()
          .setTitle(`Información de FlowBox`)
          .setColor("#864DE4")
          .setAuthor({ name: 'FlowBox | Network', iconURL: client.user.displayAvatarURL(), url: 'https://flowbox.tebex.io/'})
          .setDescription(`> ¡Espero que te diviertas en el servidor y pases un buen rato!\n\n**Estado:** ${estado}\n**Usuarios Actuales:** ${result.players.online}/${result.players.max}\n**Ip:** flowbox.fun\n**Puerto:** ${result.port}\n**Versión:** ${result.version.name_clean}\n`)
    .setImage("https://api.mcstatus.io/v2/widget/java/flowbox.fun")
    
          return interaction.reply({ embeds: [embed], ephemeral: false })
  
} catch (e) {
  return interaction.reply({ content: `Ha ocurrido un error` })
}
  }
}
