const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {

    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription(`🎶 | Se ha añadido la canción \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                ]
    });

}