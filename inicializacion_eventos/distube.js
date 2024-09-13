const chalk = require("chalk");

const { readdirSync } = require('fs');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

module.exports = async (client) => {

    const distube = new DisTube(client, {
        searchSongs: 1,
        searchCooldown: 1,
        leaveOnEmpty: true,
        emptyCooldown: 25,
        leaveOnFinish: true,
        leaveOnStop: false,
        nsfw: true,
        savePreviousSongs: false,
        plugins: [
            new SpotifyPlugin({ 
                parallel: true, 
                emitEventsAfterFetching: true,
                api: { clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET }
            }),
            new SoundCloudPlugin(),
            new YtDlpPlugin({ update: false })
        ],
        youtubeCookie: [
        {
          domain: ".youtube.com",
          expirationDate: 1737516302.50093,
          hostOnly: false,
          httpOnly: false,
          name: "__Secure-1PAPISID",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          value: "1iClq0YkBe0DnDjj/AkNhZV8x_Sa1UV7qG",
        },
        ],
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        emitAddListWhenCreatingQueue: true,
        emitAddSongWhenCreatingQueue: true,
        emitNewSongOnly: true,
        joinNewVoiceChannel: true,
        streamType: 1,
        directLink: true
    });

    client.distube = distube;

    readdirSync(`./bot/distube/`).forEach(file => {
        const event = require(`../bot/distube/${file}`);
        let eventName = file.split(".")[0];
        client.distube.on(eventName, event.bind(null, client));
    });
  console.log(chalk.bold.blue(`Se han iniciado correctamente todos los eventos de Distube.`))
}