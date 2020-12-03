const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * @class
 * @extends Command
 */
class Whowouldwin extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'whowouldwin';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.whowouldwin.short',
      usage: 'help.whowouldwin.usage',
      example: 'help.whowouldwin.example',
    };
  }

  /**
   * @async
   * @method run
   * @param {object} msg the message object
   */
  async run(msg) {
    const avatarList = msg.mentions.users.map(user =>
      user.displayAvatarURL({
        format: 'png',
        size: 1024,
      })
    );
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('whowouldwin', {
          url: avatarList[0] || msg.author,
          avatar: avatarList[1] || msg.author,
        }),
        `whowouldwin-${Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Whowouldwin;
