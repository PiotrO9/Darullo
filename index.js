const { Client, GatewayIntentBits, PermissionsBitField, Permissions, EmbedBuilder } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const botApiKey = require('./key.js');

const prefix = ">";

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
                                GatewayIntentBits.GuildMessages, 
                                GatewayIntentBits.MessageContent, 
                                GatewayIntentBits.GuildMembers,]});

const InfoEmbed = new EmbedBuilder()
.setTitle("Darullo INFO")
.setDescription("Wyświetla informacje o bocie Darullo")
.setColor("1ECC5B")
.addFields(
  {name: prefix + "info", value: "Wyświetla infromacje i dostępne komendy", inline: false},
  {name: prefix + "pozdro", value: "Pozdrawia użytkownika", inline: false},
  {name: prefix + "szambonurek", value: "Wyrzuca losowego użytkownika z kanału głoswego", inline: true},
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
                var usersNicknames = new Array();
                var usersChannels = new Array();
                
                message.guild.members.cache.filter(member => {
                    if(!member.user.bot)
                    {
                        usersFromVoiceChannel.push(member.id);
                        usersNicknames.push(member.nickname);
                        usersChannels.push(member.voice.channelId);
                    }
                });
                const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

                let SelectedIdOfUserFromVoiceChannel = usersFromVoiceChannel[random(0, usersFromVoiceChannel.length)];
                let targetUser = message.guild.members.fetch(SelectedIdOfUserFromVoiceChannel);
                (await targetUser).voice.setChannel(null);
                removeUserFromArray(usersFromVoiceChannel, SelectedIdOfUserFromVoiceChannel);

                let metry = Math.floor(Math.random()*11034+1);

                if(usersFromVoiceChannel == [])
                {
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
                    }
                    else if(liczba > 11000)
                    {
                        message.channel.send((await targetUser).nickname + "zanurkował na " + metry + " metrów, tutaj rów Mariański to highground",{tts:true})
                    }
                }

                console.log(usersFromVoiceChannel);
                // console.log(usersNicknames);
                // console.log(usersChannels);

                break;
            }
        case "wspomnienia":
            {
                message.channel.send("adi", {tts: true});
                message.channel.send({
                    files: [{
                        attachment: "images/adi.png",
                    }]
                });
                break;
            }
        default:
            {
                console.log("123");
                break;
            }
    }
});

function removeUserFromArray(arrayWithUsers, idToRemove){
    const index = arrayWithUsers.indexOf(idToRemove);
    if(index > -1) {
        arrayWithUsers.splice(index, 1);
    }
}

client.login(botApiKey.botKey);