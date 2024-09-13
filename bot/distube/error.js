const { EmbedBuilder } = require("discord.js");

module.exports = async (client, channel, err) => {

    channel.send({
        embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription(`🎶 | Ha ocurrido un error: \n${err}`)
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: true
    });

    let owner = client.users.cache.get(client.owner[0]);
    owner.send({
        embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription(`🎶 | Ha ocurrido un error: \n${err}\n<#${channel.id}>`)
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ]
    });

}