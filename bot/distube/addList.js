const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {

    queue.textChannel.send({
        embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription(`🎶 | Se ha añadido la Playlist \n[${playlist.name}](${playlist.url})\nTotal: (${playlist.songs.length} canciones) \`[${playlist.formattedDuration}]\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                 ]
    });

}