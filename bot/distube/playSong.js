const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client, queue, song) => {

    let duration = song.duration * 1000;

    const pauseButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel('Detener/Reanudar')
        .setCustomId('pauseId');
    const skipButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel('Saltar')
        .setCustomId('skipId');
    const stopButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setLabel('Parar')
        .setCustomId('stopId');
    const queueButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel('Mostrar Cola')
        .setCustomId('queueId');

    const row = new ActionRowBuilder()
        .addComponents([pauseButton, skipButton, stopButton, queueButton]);

    let thing = new EmbedBuilder()
        .setThumbnail(song.thumbnail)
        .setColor("Green")
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })

    if (song.playlist) {
        thing.setDescription(`🎶 | Empezando a sonar la playlist\n[${song.playlist.name}](${song.playlist.url}) \`[${song.playlist.songs.length} cancion/es]\`\n\nEscuchando ahora \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``);

        let embed = await queue.textChannel.send({ embeds: [thing], components: [row] });

        setTimeout(() => {
            embed.delete().catch(error => {
                if (error.code === 10008) return;
            });
        }, duration);

        await playButton(queue, duration, embed, song)

    } else {
        thing.setDescription(`🎶 | Empezando a sonar \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``);

        let embed = await queue.textChannel.send({ embeds: [thing], components: [row] });

        setTimeout(() => {
            embed.delete().catch(error => {
                if (error.code === 10008) return;
            });
        }, duration);

        await playButton(client, queue, duration, embed, song)
    }

}


async function playButton(client, queue, duration, embed, song) {
const filter = (interaction) => interaction.clicker.id === queue.voiceChannel.members.has(interaction.user.id)
    const collector = embed.createMessageComponentCollector(filter, { time: duration });

    collector.on('collect', async i => {
        if (queue.songs[0] !== song) return i.message.delete();

        let embeds = new EmbedBuilder()
            .setColor("Green")

            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })

        if (i.customId === 'pauseId') {
            if (queue.paused) {
                i.client.distube.resume(i.message);
                embeds.setDescription(`🎶 | Se ha **reanudado** la canción.`);
                i.reply({ embeds: [embeds] });
            } else {
                i.client.distube.pause(i.message);
                embeds.setDescription(`🎶 | Se ha **parado** la canción.`);
                i.reply({ embeds: [embeds] });
            }
        } else if (i.customId === 'skipId') {
            i.client.distube.skip(i.message)
                .then(song => {
                    embeds.setDescription(`🎶 | Se ha **saltado** la canción.`);
                    i.reply({ embeds: [embeds] });
                    i.message.delete();
                })
                .catch(error => {
                    if (error.code === "NO_UP_NEXT") {
                        i.client.distube.stop(i.message)
                            .then(song => {
                                embeds.setDescription(`🎶 | Se ha **saltado** la canción.`);
                                i.reply({ embeds: [embeds] });
                                i.message.delete();
                            })
                            .catch(error => {
                                return i.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`🎶 | Ha ocurrido un error al saltar la canción.`)
                                        .setColor("Red")
                                    ]
                                });
                            });
                    } else {
                        return i.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`🎶 | Ha ocurrido un error al saltar la cola`)
                                .setColor("Red")
                            ]
                        })
                    }
                });
        } else if (i.customId === 'stopId') {
            i.client.distube.stop(i.message);
            embeds.setDescription(`🎶 | Se ha **parado** la música.`);
            i.reply({ embeds: [embeds] });
            i.message.delete();
        } else if (i.customId === 'queueId') {
            const arrays = queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``);

            const embed = new EmbedBuilder()

                .setTitle(`🎶 | Cola:`)
                .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })


            const timeout = 120000;

            await button(i, arrays, embed, timeout);
        }
    });
}

async function button(i, arrays, embed, timeout) {

    const backId = 'back';
    const forwardId = 'forward';
    const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: 'Atrás',
        emoji: '⏪',
        customId: backId
    });
    const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        label: 'Siguiente',
        emoji: '⏩',
        customId: forwardId
    });

    const array = arrays;

    const generateEmbed = async start => {
        const current = array.slice(start, start + 10);

        embed.setDescription(current.join('\n') + `\n\nViendo canciones ${start + 1}-${start + current.length} con un total de ${array.length} canciones`);
        return embed;
    }

    const canFitOnOnePage = array.length <= 10

    const row1 = new ActionRowBuilder()
        .addComponents([forwardButton]);

    const embeds = await generateEmbed(0)

    const embedMessage = await i.reply({
        embeds: [embeds],
        components: canFitOnOnePage ? [] : [row1]
    });

    if (canFitOnOnePage) return;

    const collector = embedMessage.createMessageComponentCollector({
        filter: ({ user }) => user.id === i.user.id,
        time: timeout,
        componentType: 2
    });

    let currentIndex = 0;

    collector.on('collect', async interaction => {
        interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)

        const row2 = new ActionRowBuilder()
            .addComponents([...(currentIndex ? [backButton] : []), ...(currentIndex + 10 < array.length ? [forwardButton] : [])]);

        const embed = await generateEmbed(currentIndex);

        await interaction.update({
            embeds: [embed],
            components: [row2]
        })
    });
    collector.on("end", collected => {
        embedMessage.edit({ components: [] });
    });
}