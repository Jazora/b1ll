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

b1ll.on('message', function (message) {
    var VoiceRole = message.guild.roles.find(role => role.name === "B1LL")
	if (contains.call(VoiceAssistedUsers, message.author))
	{
		console.log('TEST TRUE');
		if (message.member.roles.has(VoiceRole.id)) {
			message.channel.send(message.content, { tts: true });
			message.delete();
		}
	}
    
})

b1ll.login(token);