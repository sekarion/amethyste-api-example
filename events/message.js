module.exports = class {
  /**
   * @constructor
   * @param {object} bot
   */
  constructor(bot) {
    this.bot = bot;
    this.MessageForm = this.bot.utils;
  }

  /**
   * @param {object} msg
   * @return {*}
   **/
  run(msg) {
    // ignore bot
    if (msg.author.bot) {
      return;
    }
    this.bot.log.error(msg.content);

    if (msg.content.match(new RegExp(`^<@!?${this.bot.user.id}>( |)$`))) {
      return msg.channel.send(
        `My prefix is ${
          this.bot.prefixes[0]
            ? this.MessageForm.simplewrapBlock(this.bot.prefixes[0])
            : '<@' + this.bot.user.id + '>'
        }`
      );
    }
    if (msg.content.startsWith(this.bot.prefixes[0])) {
      const cmd = msg.content.substr(this.bot.prefixes[0].length).split(' ')[0];
      const command =
        this.bot.commands.get(cmd.toLowerCase()) ||
        this.bot.commands.get(this.bot.aliases.get(cmd.toLowerCase()));
      if (command !== undefined) {
        if (command.disabled) {
          return msg.channel.send(
            'Sorry but this command is disabled at the moment'
          );
        }
        // need a guild
        if (command.needGuild && !msg.channel.guild) {
          return msg.channel.send('Need a guild');
        }
        command.run(msg);
      }
    }
  }
};
