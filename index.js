const { Client, GatewayIntentBits, PermissionsBitField, Permissions } = require('discord.js');
const botApiKey = require('./key.js');

const prefix = ">";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async(message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    switch(command)
    {
        case "pozdro":
            {
                message.channel.send("Siema " + message.author.toString());
                break;
            }
        default:
            {
                console.log("default");
                break;
            }
    }
});

client.login(botApiKey.botKey);