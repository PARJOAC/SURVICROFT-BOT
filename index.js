const { Client, Collection, Partials, GatewayIntentBits, ActivityType } = require('discord.js');
const chalk = require("chalk");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
  allowedMentions: { repliedUser: false },
});

client.slash = new Collection();
client.dataArray = [];

require("dotenv").config();

const KeepAlive = require("./inicializacion_eventos/server.js");
const Errores = require("./inicializacion_eventos/errores.js");
const Eventos = require("./inicializacion_eventos/eventos.js");
const Slash = require("./inicializacion_eventos/slashCommands.js");
const Distube = require("./inicializacion_eventos/distube.js");

(async () => {
  await client.login(process.env.BOT_TOKEN).then(console.log(chalk.bold.magenta(`Se ha iniciado sesión correctamente`)));
  await Errores();
  await Distube(client);
  await Slash(client);
  await Eventos(client);
  await KeepAlive();
})();

client.on("ready", async () => {
  client.user.setPresence({
    activities: [{
      name: `survicroft.fun | /help`,
      type: ActivityType.Custom
    }],
    status: 'online',
  });
})
