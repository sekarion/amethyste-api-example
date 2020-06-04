const Command = require('../../structures/Command');
module.exports = class Help extends Command {
  /**
   * @constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.bot = bot;
    this.cmd = 'help';
    this.aliases = ['commands', 'h', 'cmds'];
    this.cat = 'utility';
    this.needGuild = false;
    this.help = {
      short: 'help.help.short',
      usage: 'help.help.usage',
      example: 'help.help.example',
    };
  }

  /**
   * Execute the command
   * @param {object} msg the message object
   */
  async run(msg) {
    const args = msg.content.split(' ').splice(1);
    if (args.length > 0) {
      let cmd = args[0].trim();
      if (cmd.startsWith(msg.prefix)) {
        cmd = cmd.substring(msg.prefix.length);
      }
      // get cmd
      let command = this.bot.commands.get(cmd.toLowerCase());
      if (!command) {
        // check aliases
        command = this.bot.commands.get(
          this.bot.aliases.get(cmd.toLowerCase())
        );
      }
      if (command && !command.hidden) {
        if (command.help) {
          return msg.channel.send(await this.buildCommandHelp(msg, command));
        } else {
          return msg.channel.send('No details for this command');
        }
      }
    } else {
      await msg.channel.send(await this.buildMenu(msg, this.bot.commands));
    }
  }

  /**
   * build the help command
   * @param {object} msg the message object
   * @param {object} command the command object
   */
  async buildCommandHelp(msg, command) {
    let helpMessage = '';
    let titlecmd = '';
    titlecmd += `Sheet of commands ${this.bot.prefixes[0]}${command.cmd}\n`;
    if (command.aliases.length > 0) {
      const aliases = command.aliases.map(a => `\`${a}\``);
      helpMessage += `__Alias:__ ${aliases.join(', ')}\n`;
    }
    if (command.help.short) {
      helpMessage += `__Short:__ ${command.help.short}\n`;
    }
    if (command.help.long) {
      helpMessage += `__Long:__ ${command.help.long}\n`;
    }
    if (command.help.usage) {
      helpMessage += `__Use:__ ${command.help.usage}\n`;
    }
    if (command.help.example) {
      helpMessage += `__Example:__ ${command.help.example}\n`;
    }
    if (command.help.warning) {
      helpMessage += `__Warning:__ ${command.help.warning}\n`;
    }
    const embedAuthor = {
      text: msg.author.username,
      icon_url: msg.author.avatarURL,
      url: 'https://api.amethyste-bot.tk',
    };
    return {
      embed: {footer: embedAuthor, title: titlecmd, description: helpMessage},
    };
  }

  /**
   * build the help menu
   * @param {object} msg the message object
   * @param {Array} commands Array of commands
   */
  async buildMenu(msg, commands) {
    const categories = {};
    // recupère les catégories non traduite la
    commands.forEach(c => {
      if (!c.hidden) {
        if (!categories[c.cat]) {
          categories[c.cat] = [c];
        } else {
          categories[c.cat].push(c);
        }
      }
    });
    let helpMessage = '';
    const title = 'Améthyste API Example' + '\n';
    const sortedCategories = [];
    for (const key in categories) {
      if (categories.hasOwnProperty(key)) {
        sortedCategories.push(key);
        categories[key].sort((a, b) => {
          if (a.cmd > b.cmd) {
            return 1;
          }
          if (a.cmd < b.cmd) {
            return -1;
          }
          return 0;
        });
      }
    }
    sortedCategories.sort((a, b) => {
      const aCatValue = this.getCategoryRanking(a);
      const bCatValue = this.getCategoryRanking(b);
      if (aCatValue > bCatValue) {
        return 1;
      }
      if (aCatValue < bCatValue) {
        return -1;
      }
      return 0;
    });
    for (let i = 0; i < sortedCategories.length; i++) {
      const category = categories[sortedCategories[i]];
      helpMessage += '**' + `${sortedCategories[i]}` + '**' + ': \n';
      for (let x = 0; x < category.length; x++) {
        helpMessage += `\`${category[x].cmd}\``;
        if (category.length - 1 !== x) {
          helpMessage += ' ';
        }
      }
      helpMessage += '\n\n';
    }
    return {embed: {title: title, description: helpMessage}};
  }

  /**
   * Returns the sorting number for a ranking in help
   * @param {String} category Name of the category to be evaluated
   * @return {Number}
   */
  getCategoryRanking(category) {
    let ranking = 0;
    switch (category) {
      case 'ame':
        ranking = 0;
        break;
      case 'utility':
        ranking = 1;
        break;
      case 'fun':
        ranking = 2;
        break;
      case 'image':
        ranking = 3;
        break;
      case 'nsfw':
        ranking = 4;
        break;
    }
    return ranking;
  }
};
