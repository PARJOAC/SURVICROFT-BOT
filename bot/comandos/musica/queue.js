const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Ver la cola de reproducción"),
    category: "musica",
    usage: "Ver la cola de reproducción",
    name: "queue",
    n: "</queue:1196164236271947863>",
    execute: async (interaction, client) => {
        const canal_miembro = interaction.member.voice.channel;
        if (!canal_miembro) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`🎶 | No estás en un canal de voz.`)
                .setColor("Red")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        })

        const canal_bot = interaction.guild.members.me.voice.channel;
        if (canal_bot && canal_bot !== canal_miembro) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`🎶 | Tienes que estar en el mismo canal que ${interaction.client.user}.`)
                .setColor("Red")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        });
        const queue = await client.distube.getQueue(interaction);
        if (!queue) return interaction.channel.send({
            embeds: [new EmbedBuilder()
                .setDescription("🎶 | Aún no hay ninguna canción en la lista.")
                .setColor("Red")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        })
        const arrays = queue.songs.map((song, id) => `**${id + 1}**. [[${song.name}\]\(${song.uploader.name}\)](${song.url}) - \`${song.formattedDuration}\``);
        const current = arrays.slice(0, 0 + 10);
                    const embed = new EmbedBuilder()
                        .setTitle(`🎶 | Cola:`)
                        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })

        .setDescription(current.join('\n') + `\n\nViendo ${0 + current.length} canciones con un total de ${arrays.length} canciones`);
         await interaction.reply({ embeds: [embed] });
    }
}