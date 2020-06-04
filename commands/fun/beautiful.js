const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Beautiful extends Command (baseCommand)
 */
class Beautiful extends Command {
  /**
   * Constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'beautiful';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.beautiful.short',
      usage: 'help.beautiful.usage',
      example: 'help.beautiful.example',
    };
  }

  /**
   * Execute the command
   * @param {object} msg the message object
   */
  async run(msg) {
    const msgSplit = msg.content
      .trim()
      .split(' ')
      .map(c => c.trim())
      .filter(c => c !== '')
      .splice(1)
      .join(' ');
    let usr;
    if (msgSplit.length === 0) {
      usr = this.bot.utils
        .findMember(msg.channel.guild, msg.author.id, this.bot)
        .first();
    } else if (msg.mentions.members.size > 0) {
      usr = msg.mentions.members.first();
    } else if (msgSplit) {
      usr = this.bot.utils.findMember(msg.channel.guild, msgSplit, this.bot);
      if (usr.size === 0)
        return msg.channel.send(`❌ Nobody found matching \`${msgSplit}\`!`);
      else if (usr.size === 1) usr = usr.first();
      else return msg.channel.send(this.bot.utils.formatMembers(this.bot, usr));
    }
    const imgBuffer = await this.bot.ameAPI.generate('beautiful', {
      url: usr.user.displayAvatarURL({format: 'png', size: 1024}),
    });
    return await msg.channel.send(
      new MessageAttachment(imgBuffer, `beautiful-${new Date('now')}.png`)
    );
  }
}
module.exports = Beautiful;
