const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Contrast extends Command (baseCommand)
 */
class Contrast extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'contrast';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.contrast.short',
      usage: 'help.contrast.usage',
      example: 'help.contrast.example',
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
    const buffer = await this.bot.ameAPI.generate('contrast', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `contrast-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Contrast;
