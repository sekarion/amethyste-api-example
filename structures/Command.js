/**
 * Class Command (baseCommand)
 */
class Command {
  /**
   * Constructor
   * @param {object} bot
   */
  constructor(bot) {
    this.bot = bot;
    this.aliases = [];
    this.disabled = false;
    this.hidden = false;
    this.ownerOnly = false;
    this.needGuild = true;
  }

  /**
   * Execute the command
   * @param {object} msg
   */
  run(msg) {}
}

module.exports = Command;
