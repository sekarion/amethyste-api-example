const Command = require('../../structures/Command');
const { MessageAttachment } = require('discord.js');
/**
 * Class Discordhouse extends Command (baseCommand)
 */
class Discordhouse extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'discordhouse';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.discordhouse.short',
      usage: 'help.discordhouse.usage',
      example: 'help.discordhouse.example',
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
    let text;
    if (!msg.mentions.users) text = msgSplitinfo.join(' ');
    else {
      msgSplitinfo.shift();
      text = msgSplitinfo.join(' ')
    }
    if (['brilliance', 'bravery', 'balance'].indexOf(text.toLowercase()) === -1) text = '';
    const buffer = await this.bot.ameAPI.generate('discordhouse', {
      url: user.displayAvatarURL({
        format: 'png',
        size: 1024,
      }),
    });
    msg.channel.send(
      new MessageAttachment(buffer, `discordhouse-${Date.now()}.png`)
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}
module.exports = Discordhouse;
