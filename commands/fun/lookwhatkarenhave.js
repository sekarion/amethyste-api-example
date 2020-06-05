const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Lookwhatkarenhave extends Command (baseCommand)
 */
class Lookwhatkarenhave extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'lookwhatkarenhave';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.lookwhatkarenhave.short',
      usage: 'help.lookwhatkarenhave.usage',
      example: 'help.lookwhatkarenhave.example',
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
    const buffer = await this.bot.ameAPI.generate('lookwhatkarenhave', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `lookwhatkarenhave-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Lookwhatkarenhave;
