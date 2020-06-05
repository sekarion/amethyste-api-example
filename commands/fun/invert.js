const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Invert extends Command (baseCommand)
 */
class Invert extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'invert';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.invert.short',
      usage: 'help.invert.usage',
      example: 'help.invert.example',
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
    const buffer = await this.bot.ameAPI.generate('invert', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(new MessageAttachment(buffer, `invert-${Date.now()}.png`));
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Invert;
