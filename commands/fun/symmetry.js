const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class Symmetry
 * @extends Command
 */
class Symmetry extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'symmetry';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.symmetry.short',
      usage: 'help.symmetry.usage',
      example: 'help.symmetry.example',
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
    const m = await msg.channel.send('LOADING...');
    const msgSplitinfo = msg.content.split(' ').splice(1);
    let text;
    if (!msg.mentions.users) text = msgSplitinfo.join(' ');
    else {
      msgSplitinfo.shift();
      text = msgSplitinfo.join(' ');
    }
    if (
      [
        'left-right',
        'right-left',
        'top-bottom',
        'bottom-top',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].indexOf(text.toLowercase()) === -1
    )
      text = 'left-right';
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('symmetry', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
          orientation: text,
        }),
        `symmetry-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Symmetry;
