const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Glitch extends Command (baseCommand)
 */
class Glitch extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'glitch';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.glitch.short',
      usage: 'help.glitch.usage',
      example: 'help.glitch.example',
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
    const buffer = await this.bot.ameAPI.generate('glitch', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `glitch-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Glitch;
