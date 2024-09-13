const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Determinar el volumen de la canción")
        .addIntegerOption(option => option
            .setName("numero")
            .setDescription("Elige el volumen 1 - 100")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        ),
    category: "musica",
    usage: "Determinar el volumen de la canción",
    name: "volume",
    n: "</volume:1196164236519407787>",
    execute: async (interaction, client) => {
        const volume = interaction.options.getInteger("numero");
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

        await client.distube.setVolume(interaction, volume);

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Green")
                .setDescription(`\`🔊\` | Se ha **cambiado** el volumen al: \`${volume}\`%`)
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        });
    }
}