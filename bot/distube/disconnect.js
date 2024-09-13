const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {

    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription(`🎶 | Me he **desconectado** del canal de voz.\nGracias por usar ${client.user.username}!`)
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                ]
    });

}