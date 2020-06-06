const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Approved extends Command (baseCommand)
 */
class Approved extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'approved';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.approved.short',
      usage: 'help.approved.usage',
      example: 'help.approved.example',
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
    const buffer = await this.bot.ameAPI.generate('approved', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel
      .send(new MessageAttachment(buffer, `Approved-${Date.now()}.png`))
      .catch(e => this.bot.log.error(e));
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Approved;
