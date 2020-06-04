const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
const minimist = require('minimist');

/**
 * Class Beautiful extends Command (baseCommand)
 */
class Beautiful extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'blur';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.blur.short',
      usage: 'help.blur.usage',
      example: 'help.blur.example',
    };
  }

  /**
   * Execute the command
   * @param {object} msg the message object
   */
  async run(msg) {
    const msgSplitinfo = msg.content.split(' ').splice(1);
    const args = minimist(msgSplitinfo, {boolean: ['b'], string: ['i']});
    // parse the args blur
    let blur = parseInt(args.b);
    if (isNaN(blur)) {
      blur = 5;
    }
    if (blur <= 0) {
      return msg.channel.send(
        'The option blur need positive (min 1 and max 30)'
      );
    }
    if (blur > 30) {
      return msg.channel.send('The option blur max is 30');
    }
    const msgSplit = args._.join(' ');
    let usr;
    if (msgSplit.length === 0) {
      // return this user
      usr = this.bot.utils
        .findMember(msg.channel.guild, msg.author.id, this.bot)
        .first();
    } else if (msg.mentions.members.size > 0) {
      // search the first user
      usr = msg.mentions.members.first();
    } else if (msgSplit) {
      usr = this.bot.utils.findMember(msg.channel.guild, msgSplit, this.bot);
      if (usr.size === 0)
        return msg.channel.send(`❌ Nobody found matching \`${msgSplit}\`!`);
      else if (usr.size === 1) usr = usr.first();
      else return msg.channel.send(this.bot.utils.formatMembers(this.bot, usr));
    }
    // generate the image
    const imgBuffer = await this.bot.ameAPI
      .generate('blur', {
        url: usr.user.displayAvatarURL({
          format: 'png',
          size: 1024,
        }),
        blur: blur,
      })
      .catch(err => this.bot.log.error(err));
    return await msg.channel.send(
      new MessageAttachment(imgBuffer, `blur-${new Date('now')}.png`)
    );
  }
}

module.exports = Beautiful;
