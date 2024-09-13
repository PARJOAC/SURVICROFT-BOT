const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    
    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setDescription(`🎶 | No puedo encontrar el vídeo relacionado para reproducir. Deja de reproducir música.`)
            .setColor("Red")
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: true
    });

}