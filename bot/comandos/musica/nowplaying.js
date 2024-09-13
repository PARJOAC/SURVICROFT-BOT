const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Ver qué música se está escuchando"),
    category: "musica",
    usage: "Ver qué música se está escuchando",
    name: "nowplaying",
    n: "</nowplaying:1196164236271947860>",
    execute: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction);
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
        
        if (!queue) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription("🎶 | Aún no hay ninguna canción en la lista.")
                .setColor("Red")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        })

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle(`🎶 | ${queue.songs[0].name}`)
                .setDescription(`Autor: ${queue.songs[0].uploader.name}\nHora: [${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\nVisitas: ${queue.songs[0].views}\nPedido por: ${queue.songs[0].user}`)
                .setImage(queue.songs[0].thumbnail)
                .setURL(queue.songs[0].url)
                .setColor("Green")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })], ephemeral: true
        })
    }
}