const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Whowouldwin extends command (baseCommand)
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
   * Execute the command
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
    const buffer = await this.bot.ameAPI.generate('whowouldwin', {
      url: avatarList[0] || msg.author,
      avatar: avatarList[1] || msg.author,
    });
    msg.channel.send(
      new MessageAttachment(buffer, `whowouldwin-${Date.now()}.png`)
    );
    m.delete();
  }
}
module.exports = Whowouldwin;
