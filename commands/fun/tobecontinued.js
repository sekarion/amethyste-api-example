const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class
 * @extends Command
 */
class Tobecontinued extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'tobecontinued';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.tobecontinued.short',
      usage: 'help.tobecontinued.usage',
      example: 'help.tobecontinued.example',
    };
  }

  /**
   * @async
   * @method run
   * @param {object} msg the message object
   */
  async run(msg) {
    if (!msg.guild.me.hasPermission('ATTACH_FILES'))
      return msg.channel.send('I am missing `ATTACH_FILES`');
    const user = msg.mentions.users.first() || msg.author;
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('tobecontinued', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
        }),
        `tobecontinued-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Tobecontinued;
