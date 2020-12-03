const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
const minimist = require('minimist');

/**
 * @class
 * @extends Command
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
   * @async
   * @method run
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
    const user = msg.mentions.users.first() || msg.author;
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('blur', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
          blur,
        }),
        `blur-${new Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}

module.exports = Beautiful;
