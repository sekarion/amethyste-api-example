const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Beautiful extends Command (baseCommand)
 */
class Beautiful extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'beautiful';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.beautiful.short',
      usage: 'help.beautiful.usage',
      example: 'help.beautiful.example',
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
    const buffer = await this.bot.ameAPI.generate('beautiful', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 512,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `beautiful-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Beautiful;
