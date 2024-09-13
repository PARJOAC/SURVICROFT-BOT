const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce música')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Escribe el nombre de la canción / URL')
            .setRequired(true)),
    category: 'musica',
    usage: 'Reproducir música',
    name: 'play',
    n: '</play:1196164236271947862>',
    execute: async (interaction, client) => {
        const string = interaction.options.getString('name');
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

        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`🎶 | Buscando \`${string}\`...`)
                .setColor("Green")
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
            ], ephemeral: true
        });

        await client.distube.play(canal_miembro, string, {
            member: interaction.member,
            textChannel: interaction.channel
        });

    },
};