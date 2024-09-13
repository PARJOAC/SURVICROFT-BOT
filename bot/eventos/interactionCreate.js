module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash.get(interaction.commandName);
    if (!command) return;
      
      await command.execute(interaction, client);
  }
}