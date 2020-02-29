let Command = require('../../structures/Command');
module.exports = class Avatar extends Command {
    constructor(bot) {
        super(bot);
        this.cmd = 'avatar';
        this.cat = 'utility';
        this.needGuild = true;
        this.help = {
            short: 'help.avatar.short',
            usage: 'help.avatar.usage',
            example: 'help.avatar.example'
        }
    }

    async run(msg) {
        let msgSplit = msg.content.trim().split(' ').map(c => c.trim()).filter(c => c !== '').splice(1).join(" ");
        let usr;
        if (msgSplit.length === 0) {
            usr = this.bot.utils.findMember(msg.channel.guild, msg.author.id, this.bot).first();
        } else if (msg.mentions.members.size > 0) {
            usr = msg.mentions.members.first();
        } else if (msgSplit) {
            usr = this.bot.utils.findMember(msg.channel.guild, msgSplit, this.bot);
            if (usr.size === 0) return msg.channel.send(`❌ Nobody found matching \`${msgSplit}\`!`);
            else if (usr.size === 1) usr = usr.first();
            else return msg.channel.send(this.bot.utils.formatMembers(this.bot, usr));
        }
        let avatar = usr.user.avatar ? (user.user.avatar.startsWith('a_') ? `​https://cdn.discordapp.com/avatars/${usr.user.id}/${usr.user.avatar}.gif` : `​https://cdn.discordapp.com/avatars/${usr.user.id}/${usr.user.avatar}.webp`) : usr.user.defaultAvatarURL;
        avatar = avatar.replace(/[^a-zA-Z0-9_\-./:]/, '');
        avatar += '?size=1024';
        try {
            let reply = {
                embed: {
                    author: {
                        name: `${usr.user.username}#${usr.user.discriminator}`,
                    },
                    image: {
                        url: `${avatar}`
                    },
                    color: 0x00ADFF
                }
            };
            msg.channel.send(reply).then().catch(err => {
                this.bot.log.error(err);
            });
        } catch (e) {
            return this.bot.log.error(e);
        }
    }
};