const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Ps4 extends Command (baseCommand)
 */
class Ps4 extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'ps4';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.ps4.short',
      usage: 'help.ps4.usage',
      example: 'help.ps4.example',
    };
  }

  /**
   * Execute the command
   * @param {object} msg the message object
   */
  async run(msg) {
    if (!msg.guild.me.hasPermission('ATTACH_FILES'))
      return msg.channel.send('I am missing `ATTACH_FILES`');
    const user = msg.mentions.users.first() || msg.author;
    const m = await msg.channel.send('LOADING...');
    const buffer = await this.bot.ameAPI.generate('ps4', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `ps4-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Ps4;
