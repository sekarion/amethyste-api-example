const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class
 * @extends Command
 */
class Facebook extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'facebook';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.facebook.short',
      usage: 'help.facebook.usage',
      example: 'help.facebook.example',
    };
  }

  /**
   * @async
   * @method run
   * @param {object} msg the message object
   */
  async run(msg) {
    if (!msg.guild.me.hasPermission('ATTACH_FILES'))
      return msg.channel.send('I am missing `ATTACH_FILES`');
    const user = msg.mentions.users.first() || msg.author;
    const msgSplitinfo = msg.content.split(' ').splice(1);
    let text;
    if (!msg.mentions.users) text = msgSplitinfo.join(' ');
    else {
      msgSplitinfo.shift();
      text = msgSplitinfo.join(' ');
    }
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('facebook', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
          text,
        }),
        `facebook-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Facebook;
