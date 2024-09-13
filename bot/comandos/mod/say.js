const { EmbedBuilder, ChannelType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Escribir algo por el bot')
    .addChannelOption(option => option
      .setName('canal')
      .setDescription('Escribe el canal donde se escribirá')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true))
    .addStringOption(option => option
      .setName('contenido')
      .setDescription('Contenido del embed')
      .setRequired(true))
    .addStringOption(option => option
      .setName('titulo')
      .setDescription('Titulo del embed')
      .setRequired(false))
    .addStringOption(option => option
      .setName('imagen')
      .setDescription('Imagen del embed (URL)')
      .setRequired(false))
    .addStringOption(option => option
      .setName('footer')
      .setDescription('Pie de página del embed')
      .setRequired(false))
    .addBooleanOption(option => option
      .setName('tags')
	  .setDescription("Escribe las menciones")
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  usage: "Escribir algo por el bot",
  n: "</say:1196138622311743558>",
  category: "mod",
  name: "say",
  execute: async (interaction, client) => {
    let canal = interaction.options.getChannel("canal");
    let titulo = interaction.options.getString("titulo");
    let contenido = interaction.options.getString("contenido");
    let imagen = interaction.options.getString("imagen");
    let footer = interaction.options.getString("footer");
    let tags = interaction.options.getString("tags");

    const channel = interaction.guild.channels.cache.get(canal) ||
      interaction.guild.channels.resolve(canal);
      
      let contenido_hecho = contenido.replace(/ç/g, '\n')

    const embed = new EmbedBuilder()
    .setDescription(contenido_hecho)
    .setColor("#864DE4")

    if(footer) embed.setFooter({ text: footer, iconURL: client.user.displayAvatarURL() });
      if(imagen) embed.setImage(imagen);
      if(titulo) embed.setTitle(titulo);

      if (tags) {
    await channel.send({ content: tags, embeds: [embed] });
    } else {
        await channel.send({ embeds: [embed] });
    }
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription("Se ha enviado el mensaje al canal especificado.")
        .setColor("Green")
      ], ephemeral: true
    })
  }
}