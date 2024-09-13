const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, query) => {
    
    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setDescription(`🎶 | La búsqueda ha sido cancelada.`)
            .setColor("Red")
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: true
    });

}