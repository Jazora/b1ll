const Discord = require('discord.js')
const b1ll = new Discord.Client();

const token = 'NjUyMjU5Mjc5MDA0MzY4OTI2.Xel15w.1qXjQfou73r41svyIwivurFbwHw';

b1ll.on('ready', () => {
    console.log('B1LL is Online');
});

b1ll.on('message', function (message) {
    var VoiceRole = message.guild.roles.find(role => role.name === "B1LL")

    if (message.member.roles.has(VoiceRole.id)) {
        message.channel.send(message.content, { tts: true });
        message.delete();
    }
})

b1ll.login(token);