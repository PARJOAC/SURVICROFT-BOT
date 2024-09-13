const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Hacer una repetición de la música")
    .addStringOption(option => option
        .setName('tipo')
          .addChoices(
            { name: 'Apagar', value: 'off' },
            { name: 'Cola', value: 'queue' },
            { name: 'Canción', value: 'song' },
          )
                    .setDescription('¿Qué quieres repetir?')
                      .setRequired(true)),
    category: "musica",
    usage: "Hacer una repetición de la música",
    name: "loop",
    n: "</loop:1196164236271947859>",
    execute: async (interaction, client) => {
    const eleccion = interaction.options.getString('tipo');
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
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })


        if (eleccion === "song") {
            client.distube.setRepeatMode(interaction, 1);

            embed.setDescription(`🎶 | Se ha puesto en **bucle** la canción.`);
            interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (eleccion === "queue") {
            client.distube.setRepeatMode(interaction, 2);

            embed.setDescription(`🎶 | Se ha puesto en **bucle** la cola.`);
                interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (eleccion === "off") {
            client.distube.setRepeatMode(interaction, 0);

            embed.setDescription(`🎶 | Se ha **parado** el bucle.`);
                interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}