const Discord = require('discord.js')
const b1ll = new Discord.Client();
const token = process.env.bot_token;

var VoiceAssistedUsers = [];

var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

b1ll.on('ready', () => {
    console.log('B1LL is Online');
});

b1ll.on('message', (receivedMessage) => {
    if (receivedMessage.author == b1ll.user) {
        return
    }
    
	var VoiceRole = receivedMessage.guild.roles.find(role => role.name === "!!!");

	if (receivedMessage.member.roles.has(VoiceRole.id)) {
		if (receivedMessage.content.startsWith("!!!")) {
			Command(receivedMessage)
		}
		else
		{
			if (contains.call(VoiceAssistedUsers, receivedMessage.author))
			{
				receivedMessage.channel.send(receivedMessage.author + ': ' + receivedMessage.content, { tts: true });
				receivedMessage.delete();
			}
		}
	}
})

function Command(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(3)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "voiceon") {
        receivedMessage.reply('Voice enabled!');
		VoiceAssistedUsers.push(receivedMessage.author);
    }
	else if (primaryCommand == "voiceoff"){
		receivedMessage.reply('Voice disabled!');
		VoiceAssistedUsers.pop(receivedMessage.author);
	}
}

b1ll.login(token);