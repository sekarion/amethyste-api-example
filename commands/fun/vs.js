const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Vs extends command (baseCommand)
 */
class Vs extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'vs';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.vs.short',
      usage: 'help.vs.usage',
      example: 'help.vs.example',
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
    const buffer = await this.bot.ameAPI.generate('vs', {
      url: avatarList[0] || msg.author,
      avatar: avatarList[1] || msg.author,
    });
    msg.channel.send(
      new MessageAttachment(buffer, `vs-${Date.now()}.png`)
    );
    m.delete();
  }
}
module.exports = Vs;
