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
    this.cmd = 'pixelize';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.pixelize.short',
      usage: 'help.pixelize.usage',
      example: 'help.pixelize.example',
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
    // parse the args pixelize
    let pixelize = parseInt(args.b);
    if (isNaN(pixelize)) {
      pixelize = 5;
    }
    if (pixelize <= 0) {
      return msg.channel.send(
        'The option pixelize need positive (min 1 and max 50)'
      );
    }
    if (pixelize > 50) {
      return msg.channel.send('The option pixelize max is 50');
    }
    const user = msg.mentions.users.first() || msg.author;
    const m = await msg.channel.send('LOADING...');
    msg.channel.send(
      new MessageAttachment(
        await this.bot.ameAPI.generate('pixelize', {
          url: user.displayAvatarURL({
            format: 'png',
            size: 1024,
          }),
          pixelize,
        }),
        `pixelize-${new Date('now')}.png`
      )
    );
    m.delete().catch(e => this.bot.log.error(e));
  }
}

module.exports = Beautiful;
