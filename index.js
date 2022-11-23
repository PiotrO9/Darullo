const { Client, GatewayIntentBits, PermissionsBitField, Permissions, EmbedBuilder } = require('discord.js');
const botApiKey = require('./key.js');

const prefix = ">";

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
                                GatewayIntentBits.GuildMessages, 
                                GatewayIntentBits.MessageContent, 
                                GatewayIntentBits.GuildMembers]});

const InfoEmbed = new EmbedBuilder()
.setTitle("Darullo INFO")
.setDescription("Wyświetla informacje o bocie Darullo")
.setColor("1ECC5B")
.addFields(
  {name: prefix + "info", value: "Wyświetla infromacje i dostępne komendy", inline: false},
  {name: prefix + "pozdro", value: "Pozdrawia użytkownika", inline: false},
  {name: prefix + "szambonurek", value: "Jeszcze nie działa ale będzie działać", inline: true},
)

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async(message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    // const argument = messageArray.slice(1);
    // const cmd = messageArray[0];

    switch(command)
    {
        case "info":
            {
                message.channel.send({ embeds: [InfoEmbed]} );
                break;
            }
        case "pozdro":
            {
                message.channel.send("Siema " + message.author.toString());
                break;
            }
        case "szambonurek":
            {
                var usersFromVoiceChannel = new Array();
                message.guild.members.cache.filter(member => {
                    if(!member.user.bot)
                    {
                        usersFromVoiceChannel.push(member.id);
                    }
                });
                const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

                let targetUser = message.guild.members.fetch(usersFromVoiceChannel[random(0, usersFromVoiceChannel.length)]);
                (await targetUser).voice.setChannel(null);

                let metry = Math.floor(Math.random()*11034+1);

                if(metry <= 5000)
                {
                    message.channel.send((await targetUser).nickname + " zanurkował na " + metry + " metrów")
                }
                else if(metry > 5000 && metry <= 10000)
                {
                    message.channel.send((await targetUser).nickname + " zanurkował na " + metry + " metrów");
                }
                else if(metry > 10000 && metry <= 11000)
                {
                    message.channel.send((await targetUser).nickname + " zanurkował na " + metry + " metrów, rów Mariański wita a czoło wypierdala z kanału", {tts:true} )

                    (await targetUser).voice.setChannel(null);
                }
                else if(liczba > 11000)
                {
                    message.channel.send((await targetUser).nickname + "zanurkował na " + metry + " metrów, tutaj rów Mariański to highground",{tts:true})
                    (await targetUser).voice.setChannel(null);
                }

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