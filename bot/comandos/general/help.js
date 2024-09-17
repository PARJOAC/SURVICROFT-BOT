const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const boton = require("../../../extras/boton.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Comando de ayuda"),
  category: "general",
  usage: "Obtener ayuda para los comandos",
  name: "help",
  n: "</help:1196138621821005868>",
  execute: async (interaction, client) => {

    const commandsByCategory = {
      general: client.slash.filter((cmd) => cmd.category === "general"),
      mod: client.slash.filter((cmd) => cmd.category === "mod")
    };

    const indexEmbed = new EmbedBuilder()
      .setTitle("Menú de Inicio")
      .setDescription("🌎 = **GENERAL**\n🔧 = **MODS**")
      .setColor("#864DE4")
    .setFooter({ text: 'SurviCroft Network', iconURL: client.user.displayAvatarURL() })

    const GENERAL = new EmbedBuilder()
      .setTitle("Comandos de ayuda General")
      .setDescription(commandsByCategory.general.map(withAliases).join("\n") || "No hay comandos.")
      .setColor("#864DE4")
    .setFooter({ text: 'SurviCroft Network', iconURL: client.user.displayAvatarURL() })
    
    const MOD = new EmbedBuilder()
      .setTitle("Comandos de ayuda Moderación")
      .setDescription(commandsByCategory.mod.map(withAliases).join("\n") || "No hay comandos.")
      .setColor("#864DE4")
      .setFooter({ text: 'SurviCroft Network', iconURL: client.user.displayAvatarURL() })
    
    const m = await interaction.reply({ embeds: [indexEmbed], components: [boton.botones_ayuda()], ephemeral: false });

    const buttonEmbedMap = {
      GENERAL: GENERAL,
      MOD: MOD
    };

    const filter = (buttonMessage) => buttonMessage.clicker.id === interaction.user.id;
    const collector = m.createMessageComponentCollector(filter, { time: 20000 });

    collector.on('collect', async (x) => {
      if (x.member.id !== interaction.user.id) return;
      const { customId } = x;
      await m.edit({ embeds: [buttonEmbedMap[customId]], components: [boton.botones_ayuda()], ephemeral: false });
      await x.deferUpdate();
    });
  }
};




function withAliases(cmd) {
  return `${cmd.n}\nUso: ${cmd.usage}\n`;
}
