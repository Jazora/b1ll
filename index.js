const Discord = require('discord.js')
const b1ll = new Discord.Client();
const token = process.env.bot_token;

var test = false;

b1ll.on('ready', () => {
    console.log('B1LL is Online');
});

b1ll.on('message', function (message) {
    var VoiceRole = message.guild.roles.find(role => role.name === "B1LL")
	if Boolean(test)
	{
		console.log('TEST TRUE');
		if (message.member.roles.has(VoiceRole.id)) {
			message.channel.send(message.content, { tts: true });
			message.delete();
		}
	}
    
})

b1ll.login(token);