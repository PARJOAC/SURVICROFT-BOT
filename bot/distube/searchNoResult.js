const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, query) => {

    message.channel.send({
        embeds: [new EmbedBuilder()
            .setDescription(`🎶 | No se encontró ningún resultado para ${query}`)
            .setColor("Red")
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: true
    });

}