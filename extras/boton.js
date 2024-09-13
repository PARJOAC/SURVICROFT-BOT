const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function createButtons(botones) {
  return new ActionRowBuilder().addComponents(
    botones.map(button => (
      new ButtonBuilder()
        .setCustomId(button.id)
        .setLabel(button.label)
        .setStyle(button.style)
    ))
  );
}

function createButtonsEmoji(botones) {
  return new ActionRowBuilder().addComponents(
    botones.map(button => (
      new ButtonBuilder()
        .setCustomId(button.id)
        .setEmoji(button.emoji)
        .setStyle(button.style)
    ))
  );
}

module.exports = {
  botones_ayuda: () => createButtonsEmoji([
    { id: "GENERAL", emoji: "🌎", style: ButtonStyle.Secondary },
    { id: "MOD", emoji: "🔧", style: ButtonStyle.Secondary },
    { id: "MUSICA", emoji: "🎶", style: ButtonStyle.Secondary },
  ]),
}