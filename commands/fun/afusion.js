const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Afusion extends command (baseCommand)
 */
class Afusion extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'afusion';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.afusion.short',
      usage: 'help.afusion.usage',
      example: 'help.afusion.example',
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
        size: 512,
      })
    );
    const m = await msg.channel.send('LOADING...');
    const buffer = await this.bot.ameAPI.generate('afusion', {
      url: avatarList[0] || msg.author,
      avatar: avatarList[1] || msg.author,
    });
    msg.channel.send(
      new MessageAttachment(buffer, `afusion-${Date.now()}.png`)
    );
    m.delete();
  }
}
module.exports = Afusion;
