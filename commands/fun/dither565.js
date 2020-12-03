const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Dither565 extends Command (baseCommand)
 */
class Dither565 extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'dither565';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.dither565.short',
      usage: 'help.dither565.usage',
      example: 'help.dither565.example',
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
        await this.bot.ameAPI.generate('dither565', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
        }),
        `dither565-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Dither565;
