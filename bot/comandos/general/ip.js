const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Ver la IP del servidor'),
  usage: "Ver la IP del servidor",
  n: "</ip:1196138621821005869>",
  category: "general",
  name: "ip",
  execute: async (interaction, client) => {
    const embed = new EmbedBuilder()
      .setColor("#864DE4")
      .setTitle('Información de la IP del Servidor')
      .setDescription('¡Aquí está la IP del servidor! 🌐\n\nLa IP actual del servidor es: \`survicroft.fun\`\n\n> Asegúrate de compartirla con tus amigos para que también puedan unirse.')

    return interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
  },
};
