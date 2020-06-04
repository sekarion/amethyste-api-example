const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Batslap extends Command (baseCommand)
 */
class Batslap extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'batslap';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.batslap.short',
      usage: 'help.batslap.usage',
      example: 'help.batslap.example',
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
    const buffer = await this.bot.ameAPI.generate('batslap', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 512,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `batslap-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Batslap;
