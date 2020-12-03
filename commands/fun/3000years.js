const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class
 * @extends Command
 */
class Years extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = '3000years';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.3000years.short',
      usage: 'help.3000years.usage',
      example: 'help.3000years.example',
    };
  }

  /**
   * @async
   * @method run
   * @param {object} msg the mmessage object
   */
  async run(msg) {
    if (!msg.guild.me.hasPermission('ATTACH_FILES'))
      return msg.channel.send('I am missing `ATTACH_FILES`');
    const user = msg.mentions.users.first() || msg.author;
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('3000years', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
        }),
        `3000years-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Years;
