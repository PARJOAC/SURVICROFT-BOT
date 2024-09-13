const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {

    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setDescription(`🎶 | No hay más canciones en la cola.`)
            .setColor("Green")
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: true
    });

}