const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sugerencia')
    .setDescription('Enviar una sugerencia')
    .addStringOption(option => option
      .setName('comentario')
      .setDescription('Describe la sugerencia')
      .setRequired(true)),
  usage: "Enviar una sugerencia",
  n: "</sugerencia:1196138621821005871>",
  category: "general",
  name: "sugerencia",
  execute: async (interaction, client) => {
    const sugerencia = interaction.options.getString("comentario");
    
    const channel = interaction.guild.channels.cache.get("1194805570671218721") ||
      interaction.guild.channels.resolve("1194805570671218721");
    
    const message = await channel.send({
      embeds: [new EmbedBuilder()
        .setTitle('Nueva sugerencia recibida!')
        .setColor('#864DE4')
        .setDescription(`**Sugerencia enviada:**\n${sugerencia}\n\n**Usuario:**\n${interaction.user} (${interaction.user.id})\n`)
      ],
      ephhemeral: false
    });
    
    await message.react('👍');
    await message.react('👎');

    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription('Gracias por enviar la sugerencia.')
        .setColor("#864DE4")
      ], ephemeral: true
    });
  },
};