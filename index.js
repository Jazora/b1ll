const Discord = require('discord.js')
const b1ll = new Discord.Client();
const token = process.env.bot_token;

var VoiceAssistedUsers = [];

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
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
    if (receivedMessage.author == b1ll.user) { // Prevent bot from responding to its own messages
        return
    }
    
	var VoiceRole = receivedMessage.guild.roles.find(role => role.name === "B1LL");

	if (receivedMessage.member.roles.has(VoiceRole.id)) {
		if (receivedMessage.content.startsWith("!")) {
			processCommand(receivedMessage)
		}
		else
		{
			if (contains.call(VoiceAssistedUsers, message.author))
			{
				receivedMessage.channel.send(message.content, { tts: true });
				message.delete();
			}
		}
	}
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "voiceon") {
        receivedMessage.reply('Ill be your voice!');
		VoiceAssistedUsers.push(receivedMessage.author);
    }
}

b1ll.login(token);