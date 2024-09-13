const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("save")
        .setDescription("Guardar una cnción que te guste"),
    category: "musica",
    usage: "Guardar una cnción que te guste",
    name: "save",
    n: "</save:1196164236271947865>",
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
        if (!queue) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription("🎶 | Aún no hay ninguna canción en la lista.")
                .setColor("Red")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        })
        interaction.user.send({
            embeds: [new EmbedBuilder()
                .setTitle(`🎶 | ${queue.songs[0].name}`)
                .setDescription(`Autor: ${queue.songs[0].uploader.name}\nHora: [${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\nVisitas: ${queue.songs[0].views}`)
                .setImage(queue.songs[0].thumbnail)
                .setURL(queue.songs[0].url)
                .setColor("Green")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })], ephemeral: true
        })
    }
}