/* eslint-disable no-irregular-whitespace */
const Command = require('../../structures/Command');
module.exports = class Avatar extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'avatar';
    this.cat = 'utility';
    this.needGuild = true;
    this.help = {
      short: 'help.avatar.short',
      usage: 'help.avatar.usage',
      example: 'help.avatar.example',
    };
  }

  /**
   * @async
   * @method run
   * @param {object} msg the message object
   */
  async run(msg) {
    const msgSplit = msg.content
      .trim()
      .split(' ')
      .map(c => c.trim())
      .filter(c => c !== '')
      .splice(1)
      .join(' ');
    let usr;
    if (msgSplit.length === 0) {
      usr = this.bot.utils
        .findMember(msg.channel.guild, msg.author.id, this.bot)
        .first();
    } else if (msg.mentions.members.size > 0) {
      usr = msg.mentions.members.first();
    } else if (msgSplit) {
      usr = this.bot.utils.findMember(msg.channel.guild, msgSplit, this.bot);
      if (usr.size === 0)
        return msg.channel.send(`❌ Nobody found matching \`${msgSplit}\`!`);
      else if (usr.size === 1) usr = usr.first();
      else return msg.channel.send(this.bot.utils.formatMembers(this.bot, usr));
    }
    try {
      msg.channel
        .send({
          embed: {
            author: {
              name: `${usr.user.tag}`,
            },
            image: {
              url: `${usr.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096,
              })}`,
            },
            color: 0x00adff,
          },
        })
        .then()
        .catch(err => {
          this.bot.log.error(err);
        });
    } catch (e) {
      return this.bot.log.error(e);
    }
  }
};
