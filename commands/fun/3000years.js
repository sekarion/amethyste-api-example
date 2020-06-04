const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Years extends Command (baseCommand)
 */
class Years extends Command {
  /**
   * Constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = '3000years';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.3000years.short',
      usage: 'help.3000years.usage',
      example: 'help.3000years.example',
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
    const imgBuffer = await this.bot.ameAPI.generate('3000years', {
      url: usr.user.displayAvatarURL({format: 'png', size: 1024}),
    });
    return await msg.channel.send(
      new MessageAttachment(imgBuffer, `3000years-${new Date('now')}.png`)
    );
  }
}
module.exports = Years;
