const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
    const canalBienvenida = client.channels.cache.get("1194419902266744862");
  const embed = new EmbedBuilder()
  .setColor('#864DE4')
  .setTitle(`¡Hey! ${member.user.username}, Bienvenid@ a FlowBox!`)
  .setAuthor({ name: 'FlowBox | Network', iconURL: client.user.displayAvatarURL(), url: 'https://flowbox.tebex.io/' })
  .setDescription(`> ¡Espero que te diviertas en el servidor y pases un buen rato por aquí en FlowBox!, recuerda leer el canal de <#1194419274987622480>.\n\n> • Ahora mismo somos: ${member.guild.memberCount} miembros\n\n> 🎮 Ip: flowbox.fun\n> 🧨 Puerto Bedrock: 25525\n> 🛒 Tienda: https://flowbox.tebex.io/`)
  .setThumbnail(member.user.displayAvatarURL())
  
      canalBienvenida.send({ embeds: [embed] });
};