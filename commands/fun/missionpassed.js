const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Missionpassed extends Command (baseCommand)
 */
class Missionpassed extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'missionpassed';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.missionpassed.short',
      usage: 'help.missionpassed.usage',
      example: 'help.missionpassed.example',
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
    const buffer = await this.bot.ameAPI.generate('missionpassed', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `missionpassed-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Missionpassed;