const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class
 * @extends Command
 */
class Utatoo extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'utatoo';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.utatoo.short',
      usage: 'help.utatoo.usage',
      example: 'help.utatoo.example',
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
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('utatoo', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
        }),
        `utatoo-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Utatoo;
