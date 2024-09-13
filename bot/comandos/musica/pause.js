const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Parar la cola"),
    category: "musica",
    usage: "Parar la cola",
    name: "pause",
    n: "</pause:1196164236271947861>",
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

        if (queue.paused) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`🎶 | La cola está pausada.`)
                     .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        });

        client.distube.pause(interaction);

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Green")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                .setDescription(`🎶 | Se ha **pausado** la cola con éxito.`)
                    ], ephemeral: true
        });
    }
}